import styled from "styled-components";
import { Button, Checkbox, Input, Label, Modal, Select, themeSpacing } from "@amsterdam/asc-ui";
import { FormEvent, useState } from "react";
import useGetDistinctYears from "../Hooks/useGetDistinctYears";
import useGetDistinctThemes from "../Hooks/useGetDistinctThemes";
import useGetDistinctOrganisations from "../Hooks/useGetDistinctOrganisations";
import { Filter } from "../types";

const ModalContent = styled.div`
  padding: ${themeSpacing(5)};
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 50%;
`;

const FullWithLabel = styled(Label)`
  display: flex;
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
    <Modal disablePortal open={showModal} backdropOpacity={0.3} onClose={() => setShowModal(false)}>
      <ModalContent>
        <div>
          <Button
            onClick={() => {
              setFilters(localFilters);
              setShowModal(false);
            }}
          >
            Filter
          </Button>
        </div>
        <Row>
          <Column>
            <Label htmlFor="zoeken" label="Zoeken" />
            <Input
              id="zoeken"
              value={localFilters?.zoeken || ""}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setLocalFilters({ ...localFilters, zoeken: e.currentTarget.value });
              }}
            />

            <Label htmlFor="jaar" label="Jaar" />
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
                checked={localFilters.periodiek}
                onChange={() => {
                  setLocalFilters({ ...localFilters, periodiek: !localFilters?.periodiek });
                }}
              />
            </Label>
            <Label htmlFor="eenmalig" label="Eenmalig">
              <Checkbox
                id="eenmalig"
                checked={localFilters.eenmalig}
                onChange={() => {
                  setLocalFilters({ ...localFilters, eenmalig: !localFilters?.eenmalig });
                }}
              />
            </Label>

            <h4>Thema</h4>
            {themes &&
              themes.map((theme, index) => (
                <FullWithLabel key={`theme_${index}`} htmlFor={`theme_${index}`} label={theme}>
                  <Checkbox id={`theme_${index}`} />
                </FullWithLabel>
              ))}
          </Column>
          <Column>
            <h4>Organisatie</h4>
            {organisations &&
              organisations.map((organisation, index) => (
                <FullWithLabel key={`org_${index}`} htmlFor={`org_${index}`} label={organisation}>
                  <Checkbox id={`org_${index}`} />
                </FullWithLabel>
              ))}
          </Column>
        </Row>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
