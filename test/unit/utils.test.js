import { validateLink } from "../../models/link";
import { validateUser, validateUserSignup } from "../../models/user";

describe("User Login data validation", () => {
  it("Should correctly validate a user object", () => {
    const testPayload = {
      email: "ronaldosunmu@gmail.com",
      password: "ThisIsAPassword",
    };
    const testPayload2 = { email: "", password: "" };
    const { error: error1 } = validateUser(testPayload);
    const { error: error2 } = validateUser(testPayload2);
    console.log(error2);
    expect(Boolean(error1)).toBe(false);
    expect(Boolean(error2)).toBe(true);
  });
});

describe("User Signup Data validation", () => {
  it("Should correctly validate a user sign in object", () => {
    const testPayload = {
      firstName: "Ronald",
      lastName: "Dosunmu",
      password: "password123",
      email: "ronaldosunmu@gmail.com",
      confirmPassword: "password123",
    };

    const testPayload2 = {
      firstName: "Ronald",
      lastName: "Dosunmu",
      confirmPassword: "password123",
    };

    const { error: error1 } = validateUserSignup(testPayload);
    const { error: error2 } = validateUserSignup(testPayload2);

    expect(Boolean(error1)).toBe(false);
    expect(Boolean(error2)).toBe(true);
  });
});

describe("Link Data Validation", () => {
  it("Should correctly validate a link", () => {
    const testPayload = {
      link: "https://google.com",
    };
    const testPayload2 = {
      link: "",
    };
    const { error: error1 } = validateLink(testPayload);
    const { error: error2 } = validateLink(testPayload2);
    expect(Boolean(error1)).toBe(true);
    expect(Boolean(error2.details[0].message)).toBe(true);
  });
});
