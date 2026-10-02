import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddStaffAccountData {
  staffAccount_insert: StaffAccount_Key;
}

export interface AddStaffAccountVariables {
  uid: string;
  staffKey: string;
  role: string;
}

export interface AssignTeacherData {
  slot_update?: Slot_Key | null;
}

export interface AssignTeacherVariables {
  slotId: string;
  teacherKey: string;
}

export interface BootstrapAdminData {
  staffMember_insert: Staff_Key;
  staffAccount_insert: StaffAccount_Key;
}

export interface BootstrapAdminVariables {
  name: string;
}

export interface ClassSlotsData {
  slots: ({
    slotId: string;
    classId: string;
    day: string;
    dayIndex: number;
    period: number;
    subject: string;
    teacherKey: string;
    room: string;
  } & Slot_Key)[];
}

export interface ClassSlotsVariables {
  classId: string;
}

export interface Class_Key {
  classId: string;
  __typename?: 'Class_Key';
}

export interface ConversationMember_Key {
  conversationId: string;
  staffKey: string;
  __typename?: 'ConversationMember_Key';
}

export interface Conversation_Key {
  conversationId: string;
  __typename?: 'Conversation_Key';
}

export interface ListClassesData {
  classes: ({
    classId: string;
    name: string;
    room: string;
  } & Class_Key)[];
}

export interface ListStaffData {
  staffMembers: ({
    staffKey: string;
    name: string;
    role: string;
    subjects: string[];
  } & Staff_Key)[];
}

export interface ListStudentsData {
  students: ({
    studentId: string;
    name: string;
    classId: string;
    class: {
      name: string;
    };
    marks: unknown;
    average?: number | null;
    attendance?: number | null;
    lowMarks: boolean;
    lowAttendance: boolean;
  } & Student_Key)[];
}

export interface LookupStaffAccountData {
  staffAccount?: {
    uid: string;
    staffKey: string;
    role: string;
  } & StaffAccount_Key;
}

export interface LookupStaffAccountVariables {
  uid: string;
}

export interface Message_Key {
  messageId: UUIDString;
  __typename?: 'Message_Key';
}

export interface MySlotsData {
  slots: ({
    slotId: string;
    classId: string;
    class: {
      name: string;
    };
    day: string;
    dayIndex: number;
    period: number;
    subject: string;
    room: string;
  } & Slot_Key)[];
}

export interface MyThreadsData {
  conversationMembers: ({
    canPost: boolean;
    conversation: {
      conversationId: string;
      title: string;
    } & Conversation_Key;
  })[];
}

export interface SendMessageData {
  message_insert: Message_Key;
}

export interface SendMessageVariables {
  conversationId: string;
  text: string;
}

export interface Slot_Key {
  slotId: string;
  __typename?: 'Slot_Key';
}

export interface StaffAccount_Key {
  uid: string;
  __typename?: 'StaffAccount_Key';
}

export interface Staff_Key {
  staffKey: string;
  __typename?: 'Staff_Key';
}

export interface Student_Key {
  studentId: string;
  __typename?: 'Student_Key';
}

export interface ThreadMessagesData {
  conversationMembers: ({
    canPost: boolean;
    conversation: {
      conversationId: string;
      title: string;
      messages_on_conversation: ({
        messageId: UUIDString;
        fromKey: string;
        text: string;
        createdAt: TimestampString;
      } & Message_Key)[];
    } & Conversation_Key;
  })[];
}

export interface ThreadMessagesVariables {
  conversationId: string;
}

export interface UpdateStudentData {
  student_update?: Student_Key | null;
}

export interface UpdateStudentVariables {
  studentId: string;
  marks: unknown;
  average: number;
  attendance: number;
  lowMarks: boolean;
  lowAttendance: boolean;
}

interface LookupStaffAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LookupStaffAccountVariables): QueryRef<LookupStaffAccountData, LookupStaffAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LookupStaffAccountVariables): QueryRef<LookupStaffAccountData, LookupStaffAccountVariables>;
  operationName: string;
}
export const lookupStaffAccountRef: LookupStaffAccountRef;

export function lookupStaffAccount(vars: LookupStaffAccountVariables, options?: ExecuteQueryOptions): QueryPromise<LookupStaffAccountData, LookupStaffAccountVariables>;
export function lookupStaffAccount(dc: DataConnect, vars: LookupStaffAccountVariables, options?: ExecuteQueryOptions): QueryPromise<LookupStaffAccountData, LookupStaffAccountVariables>;

interface BootstrapAdminRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BootstrapAdminVariables): MutationRef<BootstrapAdminData, BootstrapAdminVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BootstrapAdminVariables): MutationRef<BootstrapAdminData, BootstrapAdminVariables>;
  operationName: string;
}
export const bootstrapAdminRef: BootstrapAdminRef;

export function bootstrapAdmin(vars: BootstrapAdminVariables): MutationPromise<BootstrapAdminData, BootstrapAdminVariables>;
export function bootstrapAdmin(dc: DataConnect, vars: BootstrapAdminVariables): MutationPromise<BootstrapAdminData, BootstrapAdminVariables>;

interface SendMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SendMessageVariables): MutationRef<SendMessageData, SendMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SendMessageVariables): MutationRef<SendMessageData, SendMessageVariables>;
  operationName: string;
}
export const sendMessageRef: SendMessageRef;

export function sendMessage(vars: SendMessageVariables): MutationPromise<SendMessageData, SendMessageVariables>;
export function sendMessage(dc: DataConnect, vars: SendMessageVariables): MutationPromise<SendMessageData, SendMessageVariables>;

interface AssignTeacherRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTeacherVariables): MutationRef<AssignTeacherData, AssignTeacherVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignTeacherVariables): MutationRef<AssignTeacherData, AssignTeacherVariables>;
  operationName: string;
}
export const assignTeacherRef: AssignTeacherRef;

export function assignTeacher(vars: AssignTeacherVariables): MutationPromise<AssignTeacherData, AssignTeacherVariables>;
export function assignTeacher(dc: DataConnect, vars: AssignTeacherVariables): MutationPromise<AssignTeacherData, AssignTeacherVariables>;

interface UpdateStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
  operationName: string;
}
export const updateStudentRef: UpdateStudentRef;

export function updateStudent(vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;
export function updateStudent(dc: DataConnect, vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface AddStaffAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddStaffAccountVariables): MutationRef<AddStaffAccountData, AddStaffAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddStaffAccountVariables): MutationRef<AddStaffAccountData, AddStaffAccountVariables>;
  operationName: string;
}
export const addStaffAccountRef: AddStaffAccountRef;

export function addStaffAccount(vars: AddStaffAccountVariables): MutationPromise<AddStaffAccountData, AddStaffAccountVariables>;
export function addStaffAccount(dc: DataConnect, vars: AddStaffAccountVariables): MutationPromise<AddStaffAccountData, AddStaffAccountVariables>;

interface ListStaffRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStaffData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListStaffData, undefined>;
  operationName: string;
}
export const listStaffRef: ListStaffRef;

export function listStaff(options?: ExecuteQueryOptions): QueryPromise<ListStaffData, undefined>;
export function listStaff(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStaffData, undefined>;

interface ListClassesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClassesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListClassesData, undefined>;
  operationName: string;
}
export const listClassesRef: ListClassesRef;

export function listClasses(options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;
export function listClasses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;

interface ClassSlotsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClassSlotsVariables): QueryRef<ClassSlotsData, ClassSlotsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClassSlotsVariables): QueryRef<ClassSlotsData, ClassSlotsVariables>;
  operationName: string;
}
export const classSlotsRef: ClassSlotsRef;

export function classSlots(vars: ClassSlotsVariables, options?: ExecuteQueryOptions): QueryPromise<ClassSlotsData, ClassSlotsVariables>;
export function classSlots(dc: DataConnect, vars: ClassSlotsVariables, options?: ExecuteQueryOptions): QueryPromise<ClassSlotsData, ClassSlotsVariables>;

interface MySlotsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MySlotsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MySlotsData, undefined>;
  operationName: string;
}
export const mySlotsRef: MySlotsRef;

export function mySlots(options?: ExecuteQueryOptions): QueryPromise<MySlotsData, undefined>;
export function mySlots(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MySlotsData, undefined>;

interface ListStudentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStudentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListStudentsData, undefined>;
  operationName: string;
}
export const listStudentsRef: ListStudentsRef;

export function listStudents(options?: ExecuteQueryOptions): QueryPromise<ListStudentsData, undefined>;
export function listStudents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStudentsData, undefined>;

interface MyThreadsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyThreadsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MyThreadsData, undefined>;
  operationName: string;
}
export const myThreadsRef: MyThreadsRef;

export function myThreads(options?: ExecuteQueryOptions): QueryPromise<MyThreadsData, undefined>;
export function myThreads(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MyThreadsData, undefined>;

interface ThreadMessagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ThreadMessagesVariables): QueryRef<ThreadMessagesData, ThreadMessagesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ThreadMessagesVariables): QueryRef<ThreadMessagesData, ThreadMessagesVariables>;
  operationName: string;
}
export const threadMessagesRef: ThreadMessagesRef;

export function threadMessages(vars: ThreadMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ThreadMessagesData, ThreadMessagesVariables>;
export function threadMessages(dc: DataConnect, vars: ThreadMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ThreadMessagesData, ThreadMessagesVariables>;

