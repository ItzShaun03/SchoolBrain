import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

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

/** Generated Node Admin SDK operation action function for the 'LookupStaffAccount' Query. Allow users to execute without passing in DataConnect. */
export function lookupStaffAccount(dc: DataConnect, vars: LookupStaffAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<LookupStaffAccountData>>;
/** Generated Node Admin SDK operation action function for the 'LookupStaffAccount' Query. Allow users to pass in custom DataConnect instances. */
export function lookupStaffAccount(vars: LookupStaffAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<LookupStaffAccountData>>;

/** Generated Node Admin SDK operation action function for the 'BootstrapAdmin' Mutation. Allow users to execute without passing in DataConnect. */
export function bootstrapAdmin(dc: DataConnect, vars: BootstrapAdminVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BootstrapAdminData>>;
/** Generated Node Admin SDK operation action function for the 'BootstrapAdmin' Mutation. Allow users to pass in custom DataConnect instances. */
export function bootstrapAdmin(vars: BootstrapAdminVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BootstrapAdminData>>;

/** Generated Node Admin SDK operation action function for the 'SendMessage' Mutation. Allow users to execute without passing in DataConnect. */
export function sendMessage(dc: DataConnect, vars: SendMessageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SendMessageData>>;
/** Generated Node Admin SDK operation action function for the 'SendMessage' Mutation. Allow users to pass in custom DataConnect instances. */
export function sendMessage(vars: SendMessageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SendMessageData>>;

/** Generated Node Admin SDK operation action function for the 'AssignTeacher' Mutation. Allow users to execute without passing in DataConnect. */
export function assignTeacher(dc: DataConnect, vars: AssignTeacherVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignTeacherData>>;
/** Generated Node Admin SDK operation action function for the 'AssignTeacher' Mutation. Allow users to pass in custom DataConnect instances. */
export function assignTeacher(vars: AssignTeacherVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignTeacherData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateStudent' Mutation. Allow users to execute without passing in DataConnect. */
export function updateStudent(dc: DataConnect, vars: UpdateStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateStudentData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateStudent' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateStudent(vars: UpdateStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateStudentData>>;

/** Generated Node Admin SDK operation action function for the 'AddStaffAccount' Mutation. Allow users to execute without passing in DataConnect. */
export function addStaffAccount(dc: DataConnect, vars: AddStaffAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddStaffAccountData>>;
/** Generated Node Admin SDK operation action function for the 'AddStaffAccount' Mutation. Allow users to pass in custom DataConnect instances. */
export function addStaffAccount(vars: AddStaffAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddStaffAccountData>>;

/** Generated Node Admin SDK operation action function for the 'ListStaff' Query. Allow users to execute without passing in DataConnect. */
export function listStaff(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListStaffData>>;
/** Generated Node Admin SDK operation action function for the 'ListStaff' Query. Allow users to pass in custom DataConnect instances. */
export function listStaff(options?: OperationOptions): Promise<ExecuteOperationResponse<ListStaffData>>;

/** Generated Node Admin SDK operation action function for the 'ListClasses' Query. Allow users to execute without passing in DataConnect. */
export function listClasses(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListClassesData>>;
/** Generated Node Admin SDK operation action function for the 'ListClasses' Query. Allow users to pass in custom DataConnect instances. */
export function listClasses(options?: OperationOptions): Promise<ExecuteOperationResponse<ListClassesData>>;

/** Generated Node Admin SDK operation action function for the 'ClassSlots' Query. Allow users to execute without passing in DataConnect. */
export function classSlots(dc: DataConnect, vars: ClassSlotsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ClassSlotsData>>;
/** Generated Node Admin SDK operation action function for the 'ClassSlots' Query. Allow users to pass in custom DataConnect instances. */
export function classSlots(vars: ClassSlotsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ClassSlotsData>>;

/** Generated Node Admin SDK operation action function for the 'MySlots' Query. Allow users to execute without passing in DataConnect. */
export function mySlots(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<MySlotsData>>;
/** Generated Node Admin SDK operation action function for the 'MySlots' Query. Allow users to pass in custom DataConnect instances. */
export function mySlots(options?: OperationOptions): Promise<ExecuteOperationResponse<MySlotsData>>;

/** Generated Node Admin SDK operation action function for the 'ListStudents' Query. Allow users to execute without passing in DataConnect. */
export function listStudents(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListStudentsData>>;
/** Generated Node Admin SDK operation action function for the 'ListStudents' Query. Allow users to pass in custom DataConnect instances. */
export function listStudents(options?: OperationOptions): Promise<ExecuteOperationResponse<ListStudentsData>>;

/** Generated Node Admin SDK operation action function for the 'MyThreads' Query. Allow users to execute without passing in DataConnect. */
export function myThreads(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<MyThreadsData>>;
/** Generated Node Admin SDK operation action function for the 'MyThreads' Query. Allow users to pass in custom DataConnect instances. */
export function myThreads(options?: OperationOptions): Promise<ExecuteOperationResponse<MyThreadsData>>;

/** Generated Node Admin SDK operation action function for the 'ThreadMessages' Query. Allow users to execute without passing in DataConnect. */
export function threadMessages(dc: DataConnect, vars: ThreadMessagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ThreadMessagesData>>;
/** Generated Node Admin SDK operation action function for the 'ThreadMessages' Query. Allow users to pass in custom DataConnect instances. */
export function threadMessages(vars: ThreadMessagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ThreadMessagesData>>;

