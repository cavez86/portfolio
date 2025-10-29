import { StyleSheet } from '@react-pdf/renderer';

// PDF styles using built-in Helvetica font for better compatibility
export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
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
    marginBottom: 20,
    paddingBottom: 15,
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
    flexDirection: 'column',
    gap: 5,
    marginTop: 5,
  },
  contactItem: {
    fontSize: 9,
    color: '#64748B',
    marginBottom: 3,
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
});
