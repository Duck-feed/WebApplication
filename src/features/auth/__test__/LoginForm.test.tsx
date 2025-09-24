import LoginForm from "../components/LoginForm";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { MemoryRouter } from "react-router-dom";

describe("LoginForm", () => {
  test("renders login form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Enter your details to sign in to your account/i)).toBeInTheDocument();
  });
});
