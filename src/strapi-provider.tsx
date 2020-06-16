import React from "react";
import { StrapiAuthenticationModal } from "./strapi-auth-modal";
import { StrapiEditingContext } from "./strapi-editing-context";
import { useState } from "react";

interface ProviderProps {
  children: any;
  editMode: boolean;
  enterEditMode: () => void;
  exitEditMode: () => void;
}
export const StrapiProvider = ({
  children,
  editMode,
  enterEditMode,
  exitEditMode,
}: ProviderProps) => {
  const [activeModal, setActiveModal] = useState("none");

  const beginAuth = async () => {
    setActiveModal("authenticate");
  };

  const onClose = async () => {
    setActiveModal("none");
  };

  const onAuthSuccess = async () => {
    enterEditMode();
    setActiveModal("none");
  };

  return (
    <StrapiEditingContext.Provider
      value={{ editMode, enterEditMode: beginAuth, exitEditMode }}
    >
      {activeModal === "authenticate" && (
        <StrapiAuthenticationModal
          close={onClose}
          onAuthSuccess={onAuthSuccess}
        />
      )}
      {children}
    </StrapiEditingContext.Provider>
  );
};
