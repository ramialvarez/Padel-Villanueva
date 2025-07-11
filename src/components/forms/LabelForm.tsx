type Props = {
  text: string;
};

export default function LabelForm({ text }: Props) {
  return <label className="font-medium mb-2 block">{text}</label>;
}
