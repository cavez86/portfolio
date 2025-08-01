/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    contacts: Contact;
    'summary-info': SummaryInfo;
    experience: Experience;
    skills: Skill;
    'soft-skills': SoftSkill;
    education: Education;
    languages: Language;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    contacts: ContactsSelect<false> | ContactsSelect<true>;
    'summary-info': SummaryInfoSelect<false> | SummaryInfoSelect<true>;
    experience: ExperienceSelect<false> | ExperienceSelect<true>;
    skills: SkillsSelect<false> | SkillsSelect<true>;
    'soft-skills': SoftSkillsSelect<false> | SoftSkillsSelect<true>;
    education: EducationSelect<false> | EducationSelect<true>;
    languages: LanguagesSelect<false> | LanguagesSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'personal-info': PersonalInfo;
  };
  globalsSelect: {
    'personal-info': PersonalInfoSelect<false> | PersonalInfoSelect<true>;
  };
  locale: 'en' | 'it';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contacts".
 */
export interface Contact {
  id: number;
  label: string;
  url: string;
  icon?:
    | (
        | 'Briefcase'
        | 'Clock'
        | 'Code'
        | 'Cpu'
        | 'Database'
        | 'GitBranch'
        | 'Github'
        | 'GraduationCap'
        | 'Layout'
        | 'Lightbulb'
        | 'Linkedin'
        | 'Mail'
        | 'Search'
        | 'Terminal'
        | 'User'
        | 'Users'
      )
    | null;
  description?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "summary-info".
 */
export interface SummaryInfo {
  id: number;
  icon?:
    | (
        | 'Briefcase'
        | 'Clock'
        | 'Code'
        | 'Cpu'
        | 'Database'
        | 'GitBranch'
        | 'Github'
        | 'GraduationCap'
        | 'Layout'
        | 'Lightbulb'
        | 'Linkedin'
        | 'Mail'
        | 'Search'
        | 'Terminal'
        | 'User'
        | 'Users'
      )
    | null;
  label: string;
  value: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experience".
 */
export interface Experience {
  id: number;
  company: string;
  location?: string | null;
  position: string;
  period: {
    dateFrom: string;
    dateTo?: string | null;
  };
  achievements?:
    | {
        label: string;
        description: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skills".
 */
export interface Skill {
  id: number;
  name: string;
  icon?:
    | (
        | 'Briefcase'
        | 'Clock'
        | 'Code'
        | 'Cpu'
        | 'Database'
        | 'GitBranch'
        | 'Github'
        | 'GraduationCap'
        | 'Layout'
        | 'Lightbulb'
        | 'Linkedin'
        | 'Mail'
        | 'Search'
        | 'Terminal'
        | 'User'
        | 'Users'
      )
    | null;
  skills?:
    | {
        skill: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "soft-skills".
 */
export interface SoftSkill {
  id: number;
  name: string;
  icon?:
    | (
        | 'Briefcase'
        | 'Clock'
        | 'Code'
        | 'Cpu'
        | 'Database'
        | 'GitBranch'
        | 'Github'
        | 'GraduationCap'
        | 'Layout'
        | 'Lightbulb'
        | 'Linkedin'
        | 'Mail'
        | 'Search'
        | 'Terminal'
        | 'User'
        | 'Users'
      )
    | null;
  skills?:
    | {
        skill: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "education".
 */
export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "languages".
 */
export interface Language {
  id: number;
  language: string;
  proficiency: string;
  level: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'contacts';
        value: number | Contact;
      } | null)
    | ({
        relationTo: 'summary-info';
        value: number | SummaryInfo;
      } | null)
    | ({
        relationTo: 'experience';
        value: number | Experience;
      } | null)
    | ({
        relationTo: 'skills';
        value: number | Skill;
      } | null)
    | ({
        relationTo: 'soft-skills';
        value: number | SoftSkill;
      } | null)
    | ({
        relationTo: 'education';
        value: number | Education;
      } | null)
    | ({
        relationTo: 'languages';
        value: number | Language;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
  sessions?:
    | T
    | {
        id?: T;
        createdAt?: T;
        expiresAt?: T;
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contacts_select".
 */
export interface ContactsSelect<T extends boolean = true> {
  label?: T;
  url?: T;
  icon?: T;
  description?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "summary-info_select".
 */
export interface SummaryInfoSelect<T extends boolean = true> {
  icon?: T;
  label?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experience_select".
 */
export interface ExperienceSelect<T extends boolean = true> {
  company?: T;
  location?: T;
  position?: T;
  period?:
    | T
    | {
        dateFrom?: T;
        dateTo?: T;
      };
  achievements?:
    | T
    | {
        label?: T;
        description?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skills_select".
 */
export interface SkillsSelect<T extends boolean = true> {
  name?: T;
  icon?: T;
  skills?:
    | T
    | {
        skill?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "soft-skills_select".
 */
export interface SoftSkillsSelect<T extends boolean = true> {
  name?: T;
  icon?: T;
  skills?:
    | T
    | {
        skill?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "education_select".
 */
export interface EducationSelect<T extends boolean = true> {
  degree?: T;
  institution?: T;
  period?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "languages_select".
 */
export interface LanguagesSelect<T extends boolean = true> {
  language?: T;
  proficiency?: T;
  level?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "personal-info".
 */
export interface PersonalInfo {
  id: number;
  name: string;
  title: string;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  availability?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "personal-info_select".
 */
export interface PersonalInfoSelect<T extends boolean = true> {
  name?: T;
  title?: T;
  description?: T;
  availability?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}