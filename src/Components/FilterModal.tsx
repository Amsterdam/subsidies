import styled from "styled-components";
import { Button, Checkbox, Input, Label, Modal, Select, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import { FormEvent, useState } from "react";
import useGetDistinctYears from "../Hooks/useGetDistinctYears";
import useGetDistinctThemes from "../Hooks/useGetDistinctThemes";
import useGetDistinctOrganisations from "../Hooks/useGetDistinctOrganisations";
import { Filter } from "../types";

const ModalContent = styled.div`
  padding: ${themeSpacing(5)};
`;

const ModalHeader = styled.div`
  padding-left: ${themeSpacing(5)};
  padding-right: ${themeSpacing(5)};

  border-bottom: 2px solid ${themeColor("tint", "level3")};

  & h2 {
    margin-top: ${themeSpacing(3)};
    margin-bottom: ${themeSpacing(3)};
  }
`;

const ModalFooter = styled.div`
  border-top: 2px solid ${themeColor("tint", "level3")};
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 5;

  padding-left: ${themeSpacing(5)};
  padding-right: ${themeSpacing(5)};

  padding-top: ${themeSpacing(3)};
  padding-bottom: ${themeSpacing(3)};
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 50%;

  margin-right: ${themeSpacing(7)};

  &:last-child {
    margin-right: 0px;
  }

  & h4 {
    margin-bottom: ${themeSpacing(3)};
  }

  & h4:first-child {
    margin-top: 0px;
  }

  & label:first-child {
    & span {
      margin-top: 0px;
    }
  }
`;

const CustomLabel = styled(Label)`
  font-weight: bold;
`;

const FullWithLabel = styled(Label)`
  display: flex;
`;

const WideModal = styled(Modal)`
  max-width: 800px;
`;

const FilterModal = ({
  showModal,
  setShowModal,
  filters,
  setFilters,
}: {
  showModal: boolean;
  setShowModal: (boolean) => void;
  filters: Filter;
  setFilters: (Filter) => void;
}) => {
  const jaren = useGetDistinctYears();
  const themes = useGetDistinctThemes();
  const organisations = useGetDistinctOrganisations();
  const [localFilters, setLocalFilters] = useState<Filter>(filters);

  return (
    <WideModal disablePortal open={showModal} backdropOpacity={0.3} onClose={() => setShowModal(false)}>
      <ModalHeader>
        <h2>Filters</h2>
      </ModalHeader>
      <ModalContent>
        <Row>
          <Column>
            <CustomLabel htmlFor="zoeken" label="Zoeken" />
            <Input
              id="zoeken"
              value={localFilters?.zoeken || ""}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setLocalFilters({ ...localFilters, zoeken: e.currentTarget.value });
              }}
            />

            <CustomLabel htmlFor="jaar" label="Jaar" />
            <Select
              id="jaar"
              value={localFilters.jaar}
              onChange={(event: FormEvent<HTMLSelectElement>) => {
                setLocalFilters({ ...localFilters, jaar: event.currentTarget.value });
              }}
            >
              {jaren.map((jaar) => (
                <option key={jaar} value={jaar}>
                  {jaar}
                </option>
              ))}
            </Select>

            <h4>Verleend bedrag</h4>
            <Label htmlFor="minimaal" label="Minimaal" />
            <Input
              id="minimaal"
              value={localFilters?.minimaal || 0}
              type="number"
              onChange={(e: FormEvent<HTMLInputElement>) => {
                const val = parseInt(e.currentTarget.value);
                setLocalFilters({ ...localFilters, minimaal: val });
              }}
            />
            <Label htmlFor="maximaal" label="Maximaal" />
            <Input
              id="maximaal"
              value={localFilters?.maximaal || 0}
              type="number"
              onChange={(e: FormEvent<HTMLInputElement>) => {
                const val = parseInt(e.currentTarget.value);
                setLocalFilters({ ...localFilters, maximaal: val });
              }}
            />

            <h4>Soort</h4>
            <Label htmlFor="periodiek" label="Periodiek">
              <Checkbox
                id="periodiek"
                checked={localFilters.periodiciteit === "Periodiek"}
                onChange={() => {
                  setLocalFilters({
                    ...localFilters,
                    periodiciteit: localFilters.periodiciteit === "Periodiek" ? undefined : "Periodiek",
                  });
                }}
              />
            </Label>
            <Label htmlFor="eenmalig" label="Eenmalig">
              <Checkbox
                id="eenmalig"
                checked={localFilters.periodiciteit === "Eenmalig"}
                onChange={() => {
                  setLocalFilters({
                    ...localFilters,
                    periodiciteit: localFilters.periodiciteit === "Eenmalig" ? undefined : "Eenmalig",
                  });
                }}
              />
            </Label>

            <h4>Thema</h4>
            {themes &&
              themes.map((theme, index) => (
                <FullWithLabel key={`theme_${index}`} htmlFor={`theme_${index}`} label={theme}>
                  <Checkbox
                    id={`theme_${index}`}
                    checked={localFilters.themas?.includes(theme)}
                    onChange={() => {
                      if (localFilters.themas?.includes(theme)) {
                        setLocalFilters({
                          ...localFilters,
                          themas: localFilters.themas.filter((t) => t !== theme),
                        });
                      } else {
                        setLocalFilters({ ...localFilters, themas: [...(localFilters.themas || []), theme] });
                      }
                    }}
                  />
                </FullWithLabel>
              ))}
          </Column>
          <Column>
            <h4>Organisatie</h4>
            {organisations &&
              organisations.map((organisation, index) => (
                <FullWithLabel key={`org_${index}`} htmlFor={`org_${index}`} label={organisation}>
                  <Checkbox
                    id={`org_${index}`}
                    checked={localFilters.organisations?.includes(organisation)}
                    onChange={() => {
                      if (!localFilters.organisations) {
                        localFilters.organisations = [organisation];
                      }

                      if (localFilters.organisations.includes(organisation)) {
                        setLocalFilters({
                          ...localFilters,
                          organisations: localFilters.organisations.filter((t) => t !== organisation),
                        });
                      } else {
                        setLocalFilters({
                          ...localFilters,
                          organisations: [...localFilters.organisations, organisation],
                        });
                      }
                    }}
                  />
                </FullWithLabel>
              ))}
          </Column>
        </Row>
      </ModalContent>
      <ModalFooter>
        <Button
          variant="secondary"
          onClick={() => {
            setFilters(localFilters);
            setShowModal(false);
          }}
        >
          Toon resultaat
        </Button>
      </ModalFooter>
    </WideModal>
  );
};

export default FilterModal;
