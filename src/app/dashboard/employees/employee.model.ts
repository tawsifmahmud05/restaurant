export interface User {
    id: string;
    userName: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    label: string | null;
    firstName: string;
    middleName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    dob: string;
    address: string | null;
    nid: string;
    image: string;
    existingImage: string;
    facebook: string | null;
    linkedin: string | null;
    twitter: string | null;
    instagram: string | null;
    github: string | null;
    genderId: number;
    genderName: string;
}

export interface Employee {
    id: string;
    designation: string;
    joinDate: string;
    amountSold: number | null;
    user: User;
}
