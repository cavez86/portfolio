import { StyleSheet } from '@react-pdf/renderer';

// PDF styles using built-in Helvetica font for better compatibility
export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
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
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 12,
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
    gap: 6,
    alignItems: 'center',
  },
  skillItem: {
    fontSize: 9,
    color: '#475569',
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginBottom: 2,
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
