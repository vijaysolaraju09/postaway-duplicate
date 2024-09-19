import jwt from "jsonwebtoken";

export class UserSchema {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export const users = [
  new UserSchema(1, "John Doe", "john.doe@example.com", "password123"),
  new UserSchema(2, "Jane Smith", "jane.smith@example.com", "securePass456"),
  new UserSchema(
    3,
    "Alice Johnson",
    "alice.johnson@example.com",
    "alicePwd789"
  ),
  new UserSchema(4, "Bob Brown", "bob.brown@example.com", "bobPassword101"),
];

export const addUser = (name, email, password) => {
  const isUser = users.find((data) => data.email == email);
  if (isUser) {
    return { success: false, msg: "user already registered" };
  } else {
    const user = new UserSchema(users.length + 1, name, email, password);
    users.push(user);
    return { success: true, msg: "User registered successfully", users: users };
  }
};

export const confirmLogin = (email, password) => {
  const user = users.find(
    (data) => data.email == email && data.password == password
  );
  return user;
};

export const getAllUsers = () => {
  return users;
};
