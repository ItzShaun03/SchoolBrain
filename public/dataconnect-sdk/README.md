# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*LookupStaffAccount*](#lookupstaffaccount)
  - [*ListStaff*](#liststaff)
  - [*ListClasses*](#listclasses)
  - [*ClassSlots*](#classslots)
  - [*MySlots*](#myslots)
  - [*ListStudents*](#liststudents)
  - [*MyThreads*](#mythreads)
  - [*ThreadMessages*](#threadmessages)
- [**Mutations**](#mutations)
  - [*BootstrapAdmin*](#bootstrapadmin)
  - [*SendMessage*](#sendmessage)
  - [*AssignTeacher*](#assignteacher)
  - [*UpdateStudent*](#updatestudent)
  - [*AddStaffAccount*](#addstaffaccount)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https:/ /firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@schoolbrain/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@schoolbrain/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@schoolbrain/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## LookupStaffAccount
You can execute the `LookupStaffAccount` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
lookupStaffAccount(vars: LookupStaffAccountVariables, options?: ExecuteQueryOptions): QueryPromise<LookupStaffAccountData, LookupStaffAccountVariables>;

interface LookupStaffAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LookupStaffAccountVariables): QueryRef<LookupStaffAccountData, LookupStaffAccountVariables>;
}
export const lookupStaffAccountRef: LookupStaffAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
lookupStaffAccount(dc: DataConnect, vars: LookupStaffAccountVariables, options?: ExecuteQueryOptions): QueryPromise<LookupStaffAccountData, LookupStaffAccountVariables>;

interface LookupStaffAccountRef {
  ...
  (dc: DataConnect, vars: LookupStaffAccountVariables): QueryRef<LookupStaffAccountData, LookupStaffAccountVariables>;
}
export const lookupStaffAccountRef: LookupStaffAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the lookupStaffAccountRef:
```typescript
const name = lookupStaffAccountRef.operationName;
console.log(name);
```

### Variables
The `LookupStaffAccount` query requires an argument of type `LookupStaffAccountVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LookupStaffAccountVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `LookupStaffAccount` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LookupStaffAccountData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LookupStaffAccountData {
  staffAccount?: {
    uid: string;
    staffKey: string;
    role: string;
  } & StaffAccount_Key;
}
```
### Using `LookupStaffAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, lookupStaffAccount, LookupStaffAccountVariables } from '@schoolbrain/dataconnect';

// The `LookupStaffAccount` query requires an argument of type `LookupStaffAccountVariables`:
const lookupStaffAccountVars: LookupStaffAccountVariables = {
  uid: ..., 
};

// Call the `lookupStaffAccount()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await lookupStaffAccount(lookupStaffAccountVars);
// Variables can be defined inline as well.
const { data } = await lookupStaffAccount({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await lookupStaffAccount(dataConnect, lookupStaffAccountVars);

console.log(data.staffAccount);

// Or, you can use the `Promise` API.
lookupStaffAccount(lookupStaffAccountVars).then((response) => {
  const data = response.data;
  console.log(data.staffAccount);
});
```

### Using `LookupStaffAccount`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, lookupStaffAccountRef, LookupStaffAccountVariables } from '@schoolbrain/dataconnect';

// The `LookupStaffAccount` query requires an argument of type `LookupStaffAccountVariables`:
const lookupStaffAccountVars: LookupStaffAccountVariables = {
  uid: ..., 
};

// Call the `lookupStaffAccountRef()` function to get a reference to the query.
const ref = lookupStaffAccountRef(lookupStaffAccountVars);
// Variables can be defined inline as well.
const ref = lookupStaffAccountRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = lookupStaffAccountRef(dataConnect, lookupStaffAccountVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.staffAccount);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.staffAccount);
});
```

## ListStaff
You can execute the `ListStaff` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listStaff(options?: ExecuteQueryOptions): QueryPromise<ListStaffData, undefined>;

interface ListStaffRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStaffData, undefined>;
}
export const listStaffRef: ListStaffRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStaff(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStaffData, undefined>;

interface ListStaffRef {
  ...
  (dc: DataConnect): QueryRef<ListStaffData, undefined>;
}
export const listStaffRef: ListStaffRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStaffRef:
```typescript
const name = listStaffRef.operationName;
console.log(name);
```

### Variables
The `ListStaff` query has no variables.
### Return Type
Recall that executing the `ListStaff` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStaffData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListStaffData {
  staffMembers: ({
    staffKey: string;
    name: string;
    role: string;
    subjects: string[];
  } & Staff_Key)[];
}
```
### Using `ListStaff`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStaff } from '@schoolbrain/dataconnect';


// Call the `listStaff()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStaff();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStaff(dataConnect);

console.log(data.staffMembers);

// Or, you can use the `Promise` API.
listStaff().then((response) => {
  const data = response.data;
  console.log(data.staffMembers);
});
```

### Using `ListStaff`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStaffRef } from '@schoolbrain/dataconnect';


// Call the `listStaffRef()` function to get a reference to the query.
const ref = listStaffRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStaffRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.staffMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.staffMembers);
});
```

## ListClasses
You can execute the `ListClasses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listClasses(options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;

interface ListClassesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClassesData, undefined>;
}
export const listClassesRef: ListClassesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listClasses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;

interface ListClassesRef {
  ...
  (dc: DataConnect): QueryRef<ListClassesData, undefined>;
}
export const listClassesRef: ListClassesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listClassesRef:
```typescript
const name = listClassesRef.operationName;
console.log(name);
```

### Variables
The `ListClasses` query has no variables.
### Return Type
Recall that executing the `ListClasses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListClassesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListClassesData {
  classes: ({
    classId: string;
    name: string;
    room: string;
  } & Class_Key)[];
}
```
### Using `ListClasses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listClasses } from '@schoolbrain/dataconnect';


// Call the `listClasses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listClasses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listClasses(dataConnect);

console.log(data.classes);

// Or, you can use the `Promise` API.
listClasses().then((response) => {
  const data = response.data;
  console.log(data.classes);
});
```

### Using `ListClasses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listClassesRef } from '@schoolbrain/dataconnect';


// Call the `listClassesRef()` function to get a reference to the query.
const ref = listClassesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listClassesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.classes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.classes);
});
```

## ClassSlots
You can execute the `ClassSlots` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
classSlots(vars: ClassSlotsVariables, options?: ExecuteQueryOptions): QueryPromise<ClassSlotsData, ClassSlotsVariables>;

interface ClassSlotsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClassSlotsVariables): QueryRef<ClassSlotsData, ClassSlotsVariables>;
}
export const classSlotsRef: ClassSlotsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
classSlots(dc: DataConnect, vars: ClassSlotsVariables, options?: ExecuteQueryOptions): QueryPromise<ClassSlotsData, ClassSlotsVariables>;

interface ClassSlotsRef {
  ...
  (dc: DataConnect, vars: ClassSlotsVariables): QueryRef<ClassSlotsData, ClassSlotsVariables>;
}
export const classSlotsRef: ClassSlotsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the classSlotsRef:
```typescript
const name = classSlotsRef.operationName;
console.log(name);
```

### Variables
The `ClassSlots` query requires an argument of type `ClassSlotsVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ClassSlotsVariables {
  classId: string;
}
```
### Return Type
Recall that executing the `ClassSlots` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClassSlotsData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ClassSlots`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, classSlots, ClassSlotsVariables } from '@schoolbrain/dataconnect';

// The `ClassSlots` query requires an argument of type `ClassSlotsVariables`:
const classSlotsVars: ClassSlotsVariables = {
  classId: ..., 
};

// Call the `classSlots()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await classSlots(classSlotsVars);
// Variables can be defined inline as well.
const { data } = await classSlots({ classId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await classSlots(dataConnect, classSlotsVars);

console.log(data.slots);

// Or, you can use the `Promise` API.
classSlots(classSlotsVars).then((response) => {
  const data = response.data;
  console.log(data.slots);
});
```

### Using `ClassSlots`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, classSlotsRef, ClassSlotsVariables } from '@schoolbrain/dataconnect';

// The `ClassSlots` query requires an argument of type `ClassSlotsVariables`:
const classSlotsVars: ClassSlotsVariables = {
  classId: ..., 
};

// Call the `classSlotsRef()` function to get a reference to the query.
const ref = classSlotsRef(classSlotsVars);
// Variables can be defined inline as well.
const ref = classSlotsRef({ classId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = classSlotsRef(dataConnect, classSlotsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.slots);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.slots);
});
```

## MySlots
You can execute the `MySlots` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
mySlots(options?: ExecuteQueryOptions): QueryPromise<MySlotsData, undefined>;

interface MySlotsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MySlotsData, undefined>;
}
export const mySlotsRef: MySlotsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
mySlots(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MySlotsData, undefined>;

interface MySlotsRef {
  ...
  (dc: DataConnect): QueryRef<MySlotsData, undefined>;
}
export const mySlotsRef: MySlotsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the mySlotsRef:
```typescript
const name = mySlotsRef.operationName;
console.log(name);
```

### Variables
The `MySlots` query has no variables.
### Return Type
Recall that executing the `MySlots` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MySlotsData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `MySlots`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, mySlots } from '@schoolbrain/dataconnect';


// Call the `mySlots()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await mySlots();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await mySlots(dataConnect);

console.log(data.slots);

// Or, you can use the `Promise` API.
mySlots().then((response) => {
  const data = response.data;
  console.log(data.slots);
});
```

### Using `MySlots`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, mySlotsRef } from '@schoolbrain/dataconnect';


// Call the `mySlotsRef()` function to get a reference to the query.
const ref = mySlotsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = mySlotsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.slots);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.slots);
});
```

## ListStudents
You can execute the `ListStudents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listStudents(options?: ExecuteQueryOptions): QueryPromise<ListStudentsData, undefined>;

interface ListStudentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStudentsData, undefined>;
}
export const listStudentsRef: ListStudentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStudents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStudentsData, undefined>;

interface ListStudentsRef {
  ...
  (dc: DataConnect): QueryRef<ListStudentsData, undefined>;
}
export const listStudentsRef: ListStudentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStudentsRef:
```typescript
const name = listStudentsRef.operationName;
console.log(name);
```

### Variables
The `ListStudents` query has no variables.
### Return Type
Recall that executing the `ListStudents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStudentsData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListStudents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStudents } from '@schoolbrain/dataconnect';


// Call the `listStudents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStudents();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStudents(dataConnect);

console.log(data.students);

// Or, you can use the `Promise` API.
listStudents().then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `ListStudents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStudentsRef } from '@schoolbrain/dataconnect';


// Call the `listStudentsRef()` function to get a reference to the query.
const ref = listStudentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStudentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## MyThreads
You can execute the `MyThreads` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
myThreads(options?: ExecuteQueryOptions): QueryPromise<MyThreadsData, undefined>;

interface MyThreadsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyThreadsData, undefined>;
}
export const myThreadsRef: MyThreadsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
myThreads(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MyThreadsData, undefined>;

interface MyThreadsRef {
  ...
  (dc: DataConnect): QueryRef<MyThreadsData, undefined>;
}
export const myThreadsRef: MyThreadsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the myThreadsRef:
```typescript
const name = myThreadsRef.operationName;
console.log(name);
```

### Variables
The `MyThreads` query has no variables.
### Return Type
Recall that executing the `MyThreads` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MyThreadsData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MyThreadsData {
  conversationMembers: ({
    canPost: boolean;
    conversation: {
      conversationId: string;
      title: string;
    } & Conversation_Key;
  })[];
}
```
### Using `MyThreads`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, myThreads } from '@schoolbrain/dataconnect';


// Call the `myThreads()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await myThreads();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await myThreads(dataConnect);

console.log(data.conversationMembers);

// Or, you can use the `Promise` API.
myThreads().then((response) => {
  const data = response.data;
  console.log(data.conversationMembers);
});
```

### Using `MyThreads`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, myThreadsRef } from '@schoolbrain/dataconnect';


// Call the `myThreadsRef()` function to get a reference to the query.
const ref = myThreadsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = myThreadsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.conversationMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.conversationMembers);
});
```

## ThreadMessages
You can execute the `ThreadMessages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
threadMessages(vars: ThreadMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ThreadMessagesData, ThreadMessagesVariables>;

interface ThreadMessagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ThreadMessagesVariables): QueryRef<ThreadMessagesData, ThreadMessagesVariables>;
}
export const threadMessagesRef: ThreadMessagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
threadMessages(dc: DataConnect, vars: ThreadMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ThreadMessagesData, ThreadMessagesVariables>;

interface ThreadMessagesRef {
  ...
  (dc: DataConnect, vars: ThreadMessagesVariables): QueryRef<ThreadMessagesData, ThreadMessagesVariables>;
}
export const threadMessagesRef: ThreadMessagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the threadMessagesRef:
```typescript
const name = threadMessagesRef.operationName;
console.log(name);
```

### Variables
The `ThreadMessages` query requires an argument of type `ThreadMessagesVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ThreadMessagesVariables {
  conversationId: string;
}
```
### Return Type
Recall that executing the `ThreadMessages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ThreadMessagesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ThreadMessages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, threadMessages, ThreadMessagesVariables } from '@schoolbrain/dataconnect';

// The `ThreadMessages` query requires an argument of type `ThreadMessagesVariables`:
const threadMessagesVars: ThreadMessagesVariables = {
  conversationId: ..., 
};

// Call the `threadMessages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await threadMessages(threadMessagesVars);
// Variables can be defined inline as well.
const { data } = await threadMessages({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await threadMessages(dataConnect, threadMessagesVars);

console.log(data.conversationMembers);

// Or, you can use the `Promise` API.
threadMessages(threadMessagesVars).then((response) => {
  const data = response.data;
  console.log(data.conversationMembers);
});
```

### Using `ThreadMessages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, threadMessagesRef, ThreadMessagesVariables } from '@schoolbrain/dataconnect';

// The `ThreadMessages` query requires an argument of type `ThreadMessagesVariables`:
const threadMessagesVars: ThreadMessagesVariables = {
  conversationId: ..., 
};

// Call the `threadMessagesRef()` function to get a reference to the query.
const ref = threadMessagesRef(threadMessagesVars);
// Variables can be defined inline as well.
const ref = threadMessagesRef({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = threadMessagesRef(dataConnect, threadMessagesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.conversationMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.conversationMembers);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## BootstrapAdmin
You can execute the `BootstrapAdmin` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
bootstrapAdmin(vars: BootstrapAdminVariables): MutationPromise<BootstrapAdminData, BootstrapAdminVariables>;

interface BootstrapAdminRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: BootstrapAdminVariables): MutationRef<BootstrapAdminData, BootstrapAdminVariables>;
}
export const bootstrapAdminRef: BootstrapAdminRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
bootstrapAdmin(dc: DataConnect, vars: BootstrapAdminVariables): MutationPromise<BootstrapAdminData, BootstrapAdminVariables>;

interface BootstrapAdminRef {
  ...
  (dc: DataConnect, vars: BootstrapAdminVariables): MutationRef<BootstrapAdminData, BootstrapAdminVariables>;
}
export const bootstrapAdminRef: BootstrapAdminRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the bootstrapAdminRef:
```typescript
const name = bootstrapAdminRef.operationName;
console.log(name);
```

### Variables
The `BootstrapAdmin` mutation requires an argument of type `BootstrapAdminVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface BootstrapAdminVariables {
  name: string;
}
```
### Return Type
Recall that executing the `BootstrapAdmin` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BootstrapAdminData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface BootstrapAdminData {
  staffMember_insert: Staff_Key;
  staffAccount_insert: StaffAccount_Key;
}
```
### Using `BootstrapAdmin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, bootstrapAdmin, BootstrapAdminVariables } from '@schoolbrain/dataconnect';

// The `BootstrapAdmin` mutation requires an argument of type `BootstrapAdminVariables`:
const bootstrapAdminVars: BootstrapAdminVariables = {
  name: ..., 
};

// Call the `bootstrapAdmin()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await bootstrapAdmin(bootstrapAdminVars);
// Variables can be defined inline as well.
const { data } = await bootstrapAdmin({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await bootstrapAdmin(dataConnect, bootstrapAdminVars);

console.log(data.staffMember_insert);
console.log(data.staffAccount_insert);

// Or, you can use the `Promise` API.
bootstrapAdmin(bootstrapAdminVars).then((response) => {
  const data = response.data;
  console.log(data.staffMember_insert);
  console.log(data.staffAccount_insert);
});
```

### Using `BootstrapAdmin`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, bootstrapAdminRef, BootstrapAdminVariables } from '@schoolbrain/dataconnect';

// The `BootstrapAdmin` mutation requires an argument of type `BootstrapAdminVariables`:
const bootstrapAdminVars: BootstrapAdminVariables = {
  name: ..., 
};

// Call the `bootstrapAdminRef()` function to get a reference to the mutation.
const ref = bootstrapAdminRef(bootstrapAdminVars);
// Variables can be defined inline as well.
const ref = bootstrapAdminRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = bootstrapAdminRef(dataConnect, bootstrapAdminVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.staffMember_insert);
console.log(data.staffAccount_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.staffMember_insert);
  console.log(data.staffAccount_insert);
});
```

## SendMessage
You can execute the `SendMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
sendMessage(vars: SendMessageVariables): MutationPromise<SendMessageData, SendMessageVariables>;

interface SendMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SendMessageVariables): MutationRef<SendMessageData, SendMessageVariables>;
}
export const sendMessageRef: SendMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
sendMessage(dc: DataConnect, vars: SendMessageVariables): MutationPromise<SendMessageData, SendMessageVariables>;

interface SendMessageRef {
  ...
  (dc: DataConnect, vars: SendMessageVariables): MutationRef<SendMessageData, SendMessageVariables>;
}
export const sendMessageRef: SendMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the sendMessageRef:
```typescript
const name = sendMessageRef.operationName;
console.log(name);
```

### Variables
The `SendMessage` mutation requires an argument of type `SendMessageVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SendMessageVariables {
  conversationId: string;
  text: string;
}
```
### Return Type
Recall that executing the `SendMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SendMessageData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SendMessageData {
  message_insert: Message_Key;
}
```
### Using `SendMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, sendMessage, SendMessageVariables } from '@schoolbrain/dataconnect';

// The `SendMessage` mutation requires an argument of type `SendMessageVariables`:
const sendMessageVars: SendMessageVariables = {
  conversationId: ..., 
  text: ..., 
};

// Call the `sendMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await sendMessage(sendMessageVars);
// Variables can be defined inline as well.
const { data } = await sendMessage({ conversationId: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await sendMessage(dataConnect, sendMessageVars);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
sendMessage(sendMessageVars).then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

### Using `SendMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, sendMessageRef, SendMessageVariables } from '@schoolbrain/dataconnect';

// The `SendMessage` mutation requires an argument of type `SendMessageVariables`:
const sendMessageVars: SendMessageVariables = {
  conversationId: ..., 
  text: ..., 
};

// Call the `sendMessageRef()` function to get a reference to the mutation.
const ref = sendMessageRef(sendMessageVars);
// Variables can be defined inline as well.
const ref = sendMessageRef({ conversationId: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = sendMessageRef(dataConnect, sendMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

## AssignTeacher
You can execute the `AssignTeacher` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
assignTeacher(vars: AssignTeacherVariables): MutationPromise<AssignTeacherData, AssignTeacherVariables>;

interface AssignTeacherRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTeacherVariables): MutationRef<AssignTeacherData, AssignTeacherVariables>;
}
export const assignTeacherRef: AssignTeacherRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignTeacher(dc: DataConnect, vars: AssignTeacherVariables): MutationPromise<AssignTeacherData, AssignTeacherVariables>;

interface AssignTeacherRef {
  ...
  (dc: DataConnect, vars: AssignTeacherVariables): MutationRef<AssignTeacherData, AssignTeacherVariables>;
}
export const assignTeacherRef: AssignTeacherRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignTeacherRef:
```typescript
const name = assignTeacherRef.operationName;
console.log(name);
```

### Variables
The `AssignTeacher` mutation requires an argument of type `AssignTeacherVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignTeacherVariables {
  slotId: string;
  teacherKey: string;
}
```
### Return Type
Recall that executing the `AssignTeacher` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignTeacherData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignTeacherData {
  slot_update?: Slot_Key | null;
}
```
### Using `AssignTeacher`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignTeacher, AssignTeacherVariables } from '@schoolbrain/dataconnect';

// The `AssignTeacher` mutation requires an argument of type `AssignTeacherVariables`:
const assignTeacherVars: AssignTeacherVariables = {
  slotId: ..., 
  teacherKey: ..., 
};

// Call the `assignTeacher()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignTeacher(assignTeacherVars);
// Variables can be defined inline as well.
const { data } = await assignTeacher({ slotId: ..., teacherKey: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignTeacher(dataConnect, assignTeacherVars);

console.log(data.slot_update);

// Or, you can use the `Promise` API.
assignTeacher(assignTeacherVars).then((response) => {
  const data = response.data;
  console.log(data.slot_update);
});
```

### Using `AssignTeacher`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignTeacherRef, AssignTeacherVariables } from '@schoolbrain/dataconnect';

// The `AssignTeacher` mutation requires an argument of type `AssignTeacherVariables`:
const assignTeacherVars: AssignTeacherVariables = {
  slotId: ..., 
  teacherKey: ..., 
};

// Call the `assignTeacherRef()` function to get a reference to the mutation.
const ref = assignTeacherRef(assignTeacherVars);
// Variables can be defined inline as well.
const ref = assignTeacherRef({ slotId: ..., teacherKey: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignTeacherRef(dataConnect, assignTeacherVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.slot_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.slot_update);
});
```

## UpdateStudent
You can execute the `UpdateStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
updateStudent(vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface UpdateStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
}
export const updateStudentRef: UpdateStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStudent(dc: DataConnect, vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface UpdateStudentRef {
  ...
  (dc: DataConnect, vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
}
export const updateStudentRef: UpdateStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStudentRef:
```typescript
const name = updateStudentRef.operationName;
console.log(name);
```

### Variables
The `UpdateStudent` mutation requires an argument of type `UpdateStudentVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStudentVariables {
  studentId: string;
  marks: unknown;
  average: number;
  attendance: number;
  lowMarks: boolean;
  lowAttendance: boolean;
}
```
### Return Type
Recall that executing the `UpdateStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStudentData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStudentData {
  student_update?: Student_Key | null;
}
```
### Using `UpdateStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStudent, UpdateStudentVariables } from '@schoolbrain/dataconnect';

// The `UpdateStudent` mutation requires an argument of type `UpdateStudentVariables`:
const updateStudentVars: UpdateStudentVariables = {
  studentId: ..., 
  marks: ..., 
  average: ..., 
  attendance: ..., 
  lowMarks: ..., 
  lowAttendance: ..., 
};

// Call the `updateStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStudent(updateStudentVars);
// Variables can be defined inline as well.
const { data } = await updateStudent({ studentId: ..., marks: ..., average: ..., attendance: ..., lowMarks: ..., lowAttendance: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStudent(dataConnect, updateStudentVars);

console.log(data.student_update);

// Or, you can use the `Promise` API.
updateStudent(updateStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

### Using `UpdateStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStudentRef, UpdateStudentVariables } from '@schoolbrain/dataconnect';

// The `UpdateStudent` mutation requires an argument of type `UpdateStudentVariables`:
const updateStudentVars: UpdateStudentVariables = {
  studentId: ..., 
  marks: ..., 
  average: ..., 
  attendance: ..., 
  lowMarks: ..., 
  lowAttendance: ..., 
};

// Call the `updateStudentRef()` function to get a reference to the mutation.
const ref = updateStudentRef(updateStudentVars);
// Variables can be defined inline as well.
const ref = updateStudentRef({ studentId: ..., marks: ..., average: ..., attendance: ..., lowMarks: ..., lowAttendance: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStudentRef(dataConnect, updateStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

## AddStaffAccount
You can execute the `AddStaffAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
addStaffAccount(vars: AddStaffAccountVariables): MutationPromise<AddStaffAccountData, AddStaffAccountVariables>;

interface AddStaffAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddStaffAccountVariables): MutationRef<AddStaffAccountData, AddStaffAccountVariables>;
}
export const addStaffAccountRef: AddStaffAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addStaffAccount(dc: DataConnect, vars: AddStaffAccountVariables): MutationPromise<AddStaffAccountData, AddStaffAccountVariables>;

interface AddStaffAccountRef {
  ...
  (dc: DataConnect, vars: AddStaffAccountVariables): MutationRef<AddStaffAccountData, AddStaffAccountVariables>;
}
export const addStaffAccountRef: AddStaffAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addStaffAccountRef:
```typescript
const name = addStaffAccountRef.operationName;
console.log(name);
```

### Variables
The `AddStaffAccount` mutation requires an argument of type `AddStaffAccountVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddStaffAccountVariables {
  uid: string;
  staffKey: string;
  role: string;
}
```
### Return Type
Recall that executing the `AddStaffAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddStaffAccountData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddStaffAccountData {
  staffAccount_insert: StaffAccount_Key;
}
```
### Using `AddStaffAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addStaffAccount, AddStaffAccountVariables } from '@schoolbrain/dataconnect';

// The `AddStaffAccount` mutation requires an argument of type `AddStaffAccountVariables`:
const addStaffAccountVars: AddStaffAccountVariables = {
  uid: ..., 
  staffKey: ..., 
  role: ..., 
};

// Call the `addStaffAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addStaffAccount(addStaffAccountVars);
// Variables can be defined inline as well.
const { data } = await addStaffAccount({ uid: ..., staffKey: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addStaffAccount(dataConnect, addStaffAccountVars);

console.log(data.staffAccount_insert);

// Or, you can use the `Promise` API.
addStaffAccount(addStaffAccountVars).then((response) => {
  const data = response.data;
  console.log(data.staffAccount_insert);
});
```

### Using `AddStaffAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addStaffAccountRef, AddStaffAccountVariables } from '@schoolbrain/dataconnect';

// The `AddStaffAccount` mutation requires an argument of type `AddStaffAccountVariables`:
const addStaffAccountVars: AddStaffAccountVariables = {
  uid: ..., 
  staffKey: ..., 
  role: ..., 
};

// Call the `addStaffAccountRef()` function to get a reference to the mutation.
const ref = addStaffAccountRef(addStaffAccountVars);
// Variables can be defined inline as well.
const ref = addStaffAccountRef({ uid: ..., staffKey: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addStaffAccountRef(dataConnect, addStaffAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.staffAccount_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.staffAccount_insert);
});
```

