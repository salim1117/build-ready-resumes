import { ResumeData, TemplateName } from "@/lib/types";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";

interface Props {
  data: ResumeData;
  template: TemplateName;
}

const TemplateRenderer = ({ data, template }: Props) => {
  switch (template) {
    case "modern":
      return <ModernTemplate data={data} />;
    case "minimal":
      return <MinimalTemplate data={data} />;
    default:
      return <ClassicTemplate data={data} />;
  }
};

export default TemplateRenderer;
