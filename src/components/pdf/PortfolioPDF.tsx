import { Document, Page, Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import type { Contact, Education, Experience, Language, PersonalInfo, Skill, SoftSkill } from '@/payload-types';

import { pdfStyles as styles } from './styles';

interface PortfolioPDFProps {
  personalInfo: PersonalInfo;
  contacts: Contact[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  softSkills: SoftSkill[];
  languages: Language[];
}

// Helper function to convert rich text to plain text with robust error handling
const convertRichTextToPlainText = (richText: unknown): string => {
  try {
    if (
      !richText ||
      typeof richText !== 'object' ||
      !('root' in richText) ||
      !richText.root ||
      typeof richText.root !== 'object' ||
      !('children' in richText.root) ||
      !Array.isArray(richText.root.children)
    ) {
      return '';
    }

    const extractText = (children: unknown[]): string => {
      return children
        .map((child) => {
          // Type guard for text nodes
          if (
            child &&
            typeof child === 'object' &&
            'type' in child &&
            child.type === 'text' &&
            'text' in child &&
            typeof child.text === 'string'
          ) {
            return child.text;
          }
          // Type guard for nodes with children
          if (child && typeof child === 'object' && 'children' in child && Array.isArray(child.children)) {
            return extractText(child.children);
          }
          return '';
        })
        .filter(Boolean) // Remove empty strings
        .join(' ');
    };

    return extractText(richText.root.children);
  } catch (error) {
    console.error('Error converting rich text to plain text:', error);
    return ''; // Return empty string on error instead of failing
  }
};

export const PortfolioPDF = ({
  personalInfo,
  contacts,
  experience,
  education,
  skills,
  softSkills,
  languages,
}: PortfolioPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.mainContainer}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.name}>{personalInfo.name}</Text>
            <Text style={styles.title}>{personalInfo.title}</Text>
          </View>

          {/* Contacts Section */}
          {contacts && contacts.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CONTACTS</Text>
              <View style={styles.contactInfo}>
                {contacts.map((contact, idx) => (
                  <Text key={idx} style={styles.contactItem}>
                    • {contact.url}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SKILLS</Text>
              {skills.map((skillCategory, idx) => (
                <View key={idx} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryName}>{skillCategory.name}</Text>
                  <View style={styles.skillsList}>
                    {skillCategory.skills?.map((skill: { skill: string; id?: string | null }, skillIdx: number) => (
                      <Text key={skillIdx} style={styles.skillItem}>
                        {skill.skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Soft Skills Section */}
          {softSkills && softSkills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SOFT SKILLS</Text>
              {softSkills.map((skillCategory, idx) => (
                <View key={idx} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryName}>{skillCategory.name}</Text>
                  <View style={styles.skillsList}>
                    {skillCategory.skills?.map((skill: { skill: string; id?: string | null }, skillIdx: number) => (
                      <Text key={skillIdx} style={styles.skillItem}>
                        {skill.skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Languages Section */}
          {languages && languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>LANGUAGES</Text>
              {languages.map((lang, idx) => (
                <View key={idx} style={styles.languageItem}>
                  <Text style={styles.languageName}>{lang.language}</Text>
                  <Text style={styles.languageProficiency}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Description Section */}
          {personalInfo.description && (
            <View style={styles.section}>
              <Text style={styles.description}>{convertRichTextToPlainText(personalInfo.description)}</Text>
            </View>
          )}

          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              {experience.map((exp, idx) => (
                <View key={idx} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.period}>
                      {dayjs(exp.period.dateFrom).format('MMM YYYY')} -{' '}
                      {exp.period.dateTo ? dayjs(exp.period.dateTo).format('MMM YYYY') : 'Present'}
                    </Text>
                  </View>
                  <Text style={styles.position}>{exp.position}</Text>
                  {exp.location && <Text style={styles.location}>{exp.location}</Text>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <View style={styles.achievementsList}>
                      {exp.achievements.map((achievement, achIdx) => (
                        <Text key={achIdx} style={styles.achievement}>
                          • {achievement.description}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education Section */}
          {education && education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {education.map((edu, idx) => (
                <View key={idx} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>
                    {edu.institution} • {edu.period}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);
