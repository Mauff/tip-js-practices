"use strict";

console.log('1. "8" + 2 =', "8" + 2, '| тип:', typeof ("8" + 2));

console.log('2. "8" - 2 =', "8" - 2, '| тип:', typeof ("8" - 2));

let res3 = Number("8") + 2;
console.log('3. Number("8") + 2 =', res3, '| тип:', typeof res3);
console.log('4. "12" > "3" =', "12" > "3", '| тип:', typeof ("12" > "3"));

console.log('5. 12 === "12" =', 12 === "12", '| тип:', typeof (12 === "12"));

let res6 = Number("");
console.log('6. Number("") =', res6, '| тип:', typeof res6);

let res7 = Number("text");
console.log('7. Number("text") =', res7, '| тип:', typeof res7);

let res8 = Boolean("false");
console.log('8. Boolean("false") =', res8, '| тип:', typeof res8);

console.log('9. typeof null =', typeof null);
console.log('   Тип результата выражения typeof null:', typeof (typeof null));
console.log('10. typeof NaN =', typeof NaN);
console.log('    Тип результата выражения typeof NaN:', typeof (typeof NaN));