import $ from "../constructor";

/**
 * Trigger a form submission on all the matched forms. It should be awaited for the side effects to run and the component to re-rendered:
 *
 * ```js
 * const onSubmit = jest.fn();
 * const createUser = $(<CreateUser onSubmit={onSubmit} />);
 * expect(onSubmit).not.toBeCalled();
 * await createUser.submit();
 * expect(onSubmit).toBeCalled();
 * ```
 *
 * **[→ Full .submit() Docs](https://react-test.dev/documentation#submit)**
 */
$.prototype.submit = function () {
  return this.trigger("submit");
};
