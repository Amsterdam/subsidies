import { useSubsidieContext } from "../DataProvider";
import PageTemplate from "../PageTemplate";

const Lijst = () => {
  const { data, isLoading } = useSubsidieContext();

  return (
    <PageTemplate>
      <div>Lijst test</div>
      {!isLoading && (
        <div>
          {data.map((d) => (
            <p key={d.DOSSIERNUMMER}>
              <span>{d.DOSSIERNUMMER}</span>
              <span>{d.PROJECT_NAAM}</span>
              <span>{d.SUBSIDIEJAAR}</span>
              <span>{d.BEDRAG_VERLEEND}</span>
            </p>
          ))}
        </div>
      )}
    </PageTemplate>
  );
};

export default Lijst;
