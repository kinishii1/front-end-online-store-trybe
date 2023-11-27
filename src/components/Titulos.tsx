type TitulosProps = {
  children: React.ReactNode;
};

export default function Titulos({ children }:TitulosProps) {
  return <h2>{children}</h2>;
}
