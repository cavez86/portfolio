import { StyleSheet } from '@react-pdf/renderer';

// PDF styles using built-in Helvetica font for better compatibility
export const pdfStyles = StyleSheet.create({
  achievement: {
    color: '#475569',
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 3,
    paddingLeft: 10,
  },
  achievementsList: {
    marginLeft: 10,
    marginTop: 5,
  },
  company: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 1.3,
  },
  contactInfo: {
    flexDirection: 'column',
    marginTop: 5,
  },
  contactItem: {
    color: '#64748B',
    fontSize: 8,
    lineHeight: 1.3,
    marginBottom: 4,
    wordWrap: 'break-word',
  },
  degree: {
    color: '#334155',
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 1.3,
  },
  description: {
    color: '#475569',
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 10,
  },
  educationItem: {
    marginBottom: 8,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  experienceItem: {
    marginBottom: 12,
  },
  header: {
    marginBottom: 15,
    paddingBottom: 12,
  },
  institution: {
    color: '#64748B',
    fontSize: 10,
    lineHeight: 1.3,
  },
  languageItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingBottom: 2,
  },
  languageName: {
    color: '#334155',
    fontSize: 9,
    lineHeight: 1.2,
  },
  languageProficiency: {
    color: '#64748B',
    fontSize: 8,
    lineHeight: 1.2,
  },
  location: {
    color: '#64748B',
    fontSize: 9,
    fontStyle: 'italic',
    lineHeight: 1.3,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  mainContent: {
    flex: 1,
    paddingLeft: 15,
  },
  name: {
    color: '#1E3A8A',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: 5,
  },
  page: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    fontSize: 10,
    padding: 40,
  },
  period: {
    color: '#64748B',
    fontSize: 9,
    lineHeight: 1.3,
  },
  position: {
    color: '#334155',
    fontSize: 11,
    lineHeight: 1.3,
    marginBottom: 2,
  },
  section: {
    marginBottom: 8,
    marginTop: 12,
  },
  sectionTitle: {
    borderBottom: '1 solid #CBD5E1',
    color: '#1E3A8A',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingBottom: 4,
  },
  sidebar: {
    borderRight: '2 solid #E2E8F0',
    paddingRight: 15,
    width: '30%',
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryName: {
    color: '#334155',
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: 5,
  },
  skillItem: {
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    color: '#475569',
    fontSize: 8,
    lineHeight: 1.1,
    marginBottom: 4,
    marginRight: 4,
    padding: '3 6',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  title: {
    color: '#64748B',
    fontSize: 16,
    lineHeight: 1.3,
    marginBottom: 10,
    textWrap: 'pretty',
  },
});
