import Sidebar from "../../components/admin/Sidebar";
import ContactMessagesTable from "../../components/admin/ContactMessagesTable";

export default function ContactMessages() {
  return (
    <Sidebar>
      <div className="flex-grow p-4">
        <main>
          <ContactMessagesTable />
        </main>
      </div>
    </Sidebar>
  );
}
