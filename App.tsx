import React, { useState } from "react";
import { openContactPicker } from "react-native-contacts";
import { useDispatch } from "react-redux";

// Un type pour représenter un destinataire
type Recipient = {
  id: number;
  name: string;
  number: string;
};

// Un type pour les props du composant RecipientList
type RecipientListProps = {
  recipients: Recipient[];
  selected: number | null;
  onSelect: () => void;
};

// Un composant qui affiche la liste des destinataires possibles
function RecipientList({
  recipients,
  selected,
  onSelect,
}: RecipientListProps) {
  return (
    <div className="recipient-list">
      <button onClick={onSelect}>Choisir un destinataire</button>
      {recipients.map((recipient) => (
        <div
          key={recipient.id}
          className={`recipient-item ${
            recipient.id === selected ? "selected" : ""
          }`}
        >
          {recipient.name} ({recipient.number})
        </div>
      ))}
    </div>
  );
}

// Un type pour les props du composant MessageInput
type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

// Un composant qui affiche le champ de saisie du message et le bouton d'envoi
function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  return (
    <div className="message-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Écrivez votre message ici"
      />
      <button onClick={onSend}>Envoyer</button>
    </div>
  );
}

// Un type pour représenter l'action d'envoi de message
type SendMessageAction = {
  type: "SEND_MESSAGE";
  payload: {
    recipient: number;
    message: string;
  };
};

// Une fonction qui crée l'action d'envoi de message
function sendMessageAction(
  recipient: number,
  message: string
): SendMessageAction {
  return {
    type: "SEND_MESSAGE",
    payload: {
      recipient,
      message,
    },
  };
}

// Le composant principal qui gère l'état de l'interface
function MessageApp() {
  // Un état pour stocker le destinataire sélectionné
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(
    null
  );
  // Un état pour stocker le message saisi
  const [message, setMessage] = useState<string>("");
  // Une liste vide de destinataires au départ
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  // On utilise useDispatch pour récupérer la fonction dispatch
  const dispatch = useDispatch();

  // Une fonction qui ouvre le sélecteur de contacts et ajoute le contact choisi à la liste des destinataires
  function selectRecipient() {
    openContactPicker().then((contact: ContactInfo) => {
      if (contact) {
        // On crée un objet de type Recipient à partir du contact choisi
        const recipient: Recipient = {
          id: contact.recordID,
          name: contact.displayName,
          number: contact.phoneNumbers[0].number,
        };
        // On ajoute le recipient à la liste des destinataires
        setRecipients([...recipients, recipient]);
        // On sélectionne le recipient comme destinataire actuel
        setSelectedRecipient(recipient.id);
      }
    });
  }

  // Une fonction qui envoie le message au destinataire sélectionné
  function sendMessage() {
    if (selectedRecipient && message) {
      // On appelle l'action Redux pour envoyer le message
      dispatch(sendMessageAction(selectedRecipient, message));
      // On réinitialise le message après l'envoi
      setMessage("");
    }
  }

  return (
    <div className="message-app">
      <h1>Interface de messagerie</h1>
      <RecipientList
        recipients={recipients}
        selected={selectedRecipient}
        onSelect={selectRecipient}
      />
      <MessageInput
        value={message}
        onChange={setMessage}
        onSend={sendMessage}
      />
    </div>
  );
}

export default MessageApp;