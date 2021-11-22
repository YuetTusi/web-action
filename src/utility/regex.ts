//手机号码
export const MobileNumber = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[0267])[0-9]{8}$/;
//银行卡号
export const BankCardNumber = /\d{13,19}/;
//警员编号
export const PoliceNumber = /\d{6}/;
//身份证号
export const ChineseIdNumber = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
//数字
export const OnlyNumber = /^\d+$/;