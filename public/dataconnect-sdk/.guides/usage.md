# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { lookupStaffAccount, bootstrapAdmin, sendMessage, assignTeacher, updateStudent, addStaffAccount, listStaff, listClasses, classSlots, mySlots } from '@schoolbrain/dataconnect';


// Operation LookupStaffAccount:  For variables, look at type LookupStaffAccountVars in ../index.d.ts
const { data } = await LookupStaffAccount(dataConnect, lookupStaffAccountVars);

// Operation BootstrapAdmin:  For variables, look at type BootstrapAdminVars in ../index.d.ts
const { data } = await BootstrapAdmin(dataConnect, bootstrapAdminVars);

// Operation SendMessage:  For variables, look at type SendMessageVars in ../index.d.ts
const { data } = await SendMessage(dataConnect, sendMessageVars);

// Operation AssignTeacher:  For variables, look at type AssignTeacherVars in ../index.d.ts
const { data } = await AssignTeacher(dataConnect, assignTeacherVars);

// Operation UpdateStudent:  For variables, look at type UpdateStudentVars in ../index.d.ts
const { data } = await UpdateStudent(dataConnect, updateStudentVars);

// Operation AddStaffAccount:  For variables, look at type AddStaffAccountVars in ../index.d.ts
const { data } = await AddStaffAccount(dataConnect, addStaffAccountVars);

// Operation ListStaff: 
const { data } = await ListStaff(dataConnect);

// Operation ListClasses: 
const { data } = await ListClasses(dataConnect);

// Operation ClassSlots:  For variables, look at type ClassSlotsVars in ../index.d.ts
const { data } = await ClassSlots(dataConnect, classSlotsVars);

// Operation MySlots: 
const { data } = await MySlots(dataConnect);


```