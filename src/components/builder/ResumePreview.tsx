import { ResumeData, TemplateName, ThemeName } from "@/lib/types";
import { getTemplate, getTheme } from "@/lib/storage";
import TemplateRenderer from "@/components/templates/TemplateRenderer";

interface Props {
  data: ResumeData;
}

const ResumePreview = ({ data }: Props) => {
  const template: TemplateName = getTemplate();
  const theme: ThemeName = getTheme();

  return (
    <div
      className="rounded border border-border bg-white p-[24px] shadow-sm"
      data-theme={theme}
    >
      <TemplateRenderer data={data} template={template} />
    </div>
  );
};

export default ResumePreview;
