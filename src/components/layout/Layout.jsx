import { Columns, Column } from "./Column";
export default function Layout({ left, right,ratio}) {
  return (
    <Columns>
      <Column ratio={ratio[0]}>{left}</Column>
      <Column ratio={ratio[1]}>{right}</Column>
    </Columns>
  );
}
