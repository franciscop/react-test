import React from "react";
import $ from "../../";

const CreateUser = ({ onSubmit }: { onSubmit: () => void }) => (
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
    const onSubmit = vi.fn();
    const createUser = $(<CreateUser onSubmit={onSubmit} />);
    expect(onSubmit).not.toHaveBeenCalled();
    await createUser.submit();
    expect(onSubmit).toHaveBeenCalled();
  });

  it("submits the form when clicking the button", async () => {
    const onSubmit = vi.fn();
    const createUser = $(<CreateUser onSubmit={onSubmit} />);
    expect(onSubmit).not.toHaveBeenCalled();
    await createUser.find("button").click();
    expect(onSubmit).toHaveBeenCalled();
  });

  describe("readme", () => {
    const CreateUser = ({ onSubmit }: { onSubmit: () => void }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault(); // <- this is required _when testing_
          onSubmit();
        }}
      >
        <input name="firstname" />
        <input name="lastname" />
        <input name="age" />
        <button>Submit</button>
      </form>
    );

    it("can mock submitting a form", async () => {
      const onSubmit = vi.fn();
      const createUser = $(<CreateUser onSubmit={onSubmit} />);
      expect(onSubmit).not.toHaveBeenCalled();
      await createUser.submit();
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
