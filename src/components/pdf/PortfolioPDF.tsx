import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import type { Contact, Education, Experience, Language, PersonalInfo, Skill, SoftSkill } from '@/payload-types';

// Register fonts with fallback to default Helvetica
// Using external fonts with try/catch to handle potential failures gracefully
try {
  Font.register({
    family: 'Roboto',
    fonts: [
      { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf' },
      {
        src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf',
        fontWeight: 'bold',
      },
      {
        src: 'https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu51xIIzIXKMny.ttf',
        fontStyle: 'italic',
      },
    ],
  });
} catch (error) {
  console.warn('Failed to load Roboto font, falling back to default fonts:', error);
  // Font will fallback to Helvetica (default) if registration fails
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: '2 solid #2563EB',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 10,
    lineHeight: 1.6,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
  },
  contactItem: {
    fontSize: 9,
    color: '#64748B',
    marginRight: 15,
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1 solid #CBD5E1',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  company: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  position: {
    fontSize: 11,
    color: '#334155',
    marginBottom: 2,
  },
  period: {
    fontSize: 9,
    color: '#64748B',
  },
  location: {
    fontSize: 9,
    color: '#64748B',
    fontStyle: 'italic',
  },
  achievementsList: {
    marginTop: 5,
    marginLeft: 10,
  },
  achievement: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 3,
    paddingLeft: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  skillCategory: {
    marginBottom: 10,
  },
  skillCategoryName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 4,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillItem: {
    fontSize: 9,
    color: '#475569',
    backgroundColor: '#F1F5F9',
    padding: '3 8',
    borderRadius: 3,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingBottom: 5,
  },
  languageName: {
    fontSize: 10,
    color: '#334155',
  },
  languageProficiency: {
    fontSize: 9,
    color: '#64748B',
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#334155',
  },
  institution: {
    fontSize: 10,
    color: '#64748B',
  },
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  column: {
    flex: 1,
  },
});

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
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.name}</Text>
        <Text style={styles.title}>{personalInfo.title}</Text>
        {personalInfo.description && (
          <Text style={styles.description}>{convertRichTextToPlainText(personalInfo.description)}</Text>
        )}
        <View style={styles.contactInfo}>
          {contacts.map((contact, idx) => (
            <Text key={idx} style={styles.contactItem}>
              {contact.label}: {contact.url}
            </Text>
          ))}
        </View>
      </View>

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

      {/* Skills Section - Two Column Layout */}
      <View style={styles.twoColumnContainer}>
        {/* Technical Skills Column */}
        {skills && skills.length > 0 && (
          <View style={[styles.section, styles.column]}>
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

        {/* Soft Skills Column */}
        {softSkills && softSkills.length > 0 && (
          <View style={[styles.section, styles.column]}>
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
      </View>

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
    </Page>
  </Document>
);
