import { ReactElement } from "react";
import Header from "../header/Header";

interface Props {
  children: ReactElement;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default RootLayout;
