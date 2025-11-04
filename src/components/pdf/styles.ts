import { StyleSheet } from '@react-pdf/renderer';

// PDF styles using built-in Helvetica font for better compatibility
export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 20,
  },
  sidebar: {
    width: '30%',
    paddingRight: 15,
    borderRight: '2 solid #E2E8F0',
  },
  mainContent: {
    flex: 1,
    paddingLeft: 15,
  },
  header: {
    marginBottom: 15,
    paddingBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 5,
    lineHeight: 1.2,
  },
  title: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 10,
    lineHeight: 1.3,
    textWrap: 'balance',
  },
  description: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 10,
    lineHeight: 1.6,
  },
  contactInfo: {
    flexDirection: 'column',
    marginTop: 5,
  },
  contactItem: {
    fontSize: 8,
    color: '#64748B',
    marginBottom: 4,
    lineHeight: 1.3,
    wordWrap: 'break-word',
  },
  section: {
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 8,
    paddingBottom: 4,
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
    lineHeight: 1.3,
  },
  position: {
    fontSize: 11,
    color: '#334155',
    marginBottom: 2,
    lineHeight: 1.3,
  },
  period: {
    fontSize: 9,
    color: '#64748B',
    lineHeight: 1.3,
  },
  location: {
    fontSize: 9,
    color: '#64748B',
    fontStyle: 'italic',
    lineHeight: 1.3,
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
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 5,
    lineHeight: 1.2,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  skillItem: {
    fontSize: 8,
    color: '#475569',
    backgroundColor: '#F1F5F9',
    padding: '3 6',
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 4,
    lineHeight: 1.1,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingBottom: 2,
    alignItems: 'center',
  },
  languageName: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.2,
  },
  languageProficiency: {
    fontSize: 8,
    color: '#64748B',
    lineHeight: 1.2,
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#334155',
    lineHeight: 1.3,
  },
  institution: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 1.3,
  },
});
