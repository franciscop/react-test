import React from "react";
import $ from "../../";
import "babel-polyfill";

const CreateUser = ({ onSubmit }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <input name="firstname" />
    <input name="lastname" />
    <input name="age" />
    <button>Submit</button>
  </form>
);

describe(".submit()", () => {
  it("can mock submitting a form", async () => {
    const onSubmit = jest.fn();
    const createUser = $(<CreateUser onSubmit={onSubmit} />);
    expect(onSubmit).not.toBeCalled();
    await createUser.submit();
    expect(onSubmit).toBeCalled();
  });

  it("submits the form when clicking the button", async () => {
    const onSubmit = jest.fn();
    const createUser = $(<CreateUser onSubmit={onSubmit} />);
    expect(onSubmit).not.toBeCalled();
    await createUser.find("button").click();
    expect(onSubmit).toBeCalled();
  });
});
