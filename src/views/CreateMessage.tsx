import { useEffect, useState } from "react";

const bodyWorkshopUserMessage = {
  event_name: "GenAI Event",
  date: "12 Nov 2024",
  time_start: "12:00 PM",
  time_end: "02:00 PM",
  location: "MIT College Satara",
  description: "This is a test event",
  dress_code: "Formal",
  contact_person: "Sharad Bhadait",
  rsvp_by: "9552158335",
  contact_website: "sharad31.vercel.app",
  registration_link: "www.test.com",
};

export default function CreateMessage() {
  const [showDialog, setShowDialog] = useState(false);
  const [templates, setTemplates] = useState<string[]>([]);
  const [newTemplate, setNewTemplate] = useState(bodyWorkshopUserMessage);
  const [deleteTemplate, setDeleteTemplate] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/events/workshop`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch messages");
      }

      const data = await response.json();
      // Convert the objects to strings before setting them in state
      const formattedTemplates = Array.isArray(data)
        ? data.map((template) => JSON.stringify(template, null, 2))
        : [JSON.stringify(data, null, 2)];

      setDeleteTemplate(data);
      setTemplates(formattedTemplates);
    } catch (error) {
      console.error("Error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to fetch messages"
      );
    }
  };
  const sendToBackend = async (message: typeof bodyWorkshopUserMessage) => {
    try {
      // const requestBody = {
      //   message  // Wrap the message in an object
      // };

      const response = await fetch(
        `${BACKEND_URL}/api/events/workshop`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      alert("Message sent successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Failed to send message");
    }
  };

  const handleCreateTemplate = () => {
    setTemplates([...templates, JSON.stringify(newTemplate, null, 2)]);
    setNewTemplate(bodyWorkshopUserMessage);
    sendToBackend(newTemplate);
    setShowDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTemplate({ ...newTemplate, [name]: value });
  };

  const handleDeleteTemplate = async (indexToDelete: number) => {
    setTemplates(templates.filter((_, index) => index !== indexToDelete));
    const toDel = deleteTemplate[indexToDelete];
    console.log(toDel);

    const res = await fetch("/api/events/workshop", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: toDel["_id"] }),
    });

    console.log(res);
  };

  const sendMessage = (index: number) => async () => {
    const message = JSON.parse(templates[index]);
    console.log(message);
    await fetch(`${BACKEND_URL}/api/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: message._id }),
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-center mb-8">
        <button
          className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
          onClick={() => setShowDialog(true)}
        >
          Create New Message
        </button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                Create Template Message
              </h2>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(bodyWorkshopUserMessage).map(
                  ([key, defaultValue]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/_/g, " ")}
                      </label>
                      <input
                        type={key.includes("date") ? "date" : "text"}
                        name={key}
                        value={
                          newTemplate[
                            key as keyof typeof bodyWorkshopUserMessage
                          ]
                        }
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder={defaultValue}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleCreateTemplate}
              >
                Save Message
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Saved Templates
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {templates.map((template, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow relative"
            >
              <button
                onClick={() => handleDeleteTemplate(index)}
                className="absolute top-2 right-2 h-12 w-12 text-red-600 hover:text-red-700 p-2"
                title="Delete template"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                {template}
              </pre>
              <div className="flex justify-end">
                <button
                  onClick={sendMessage(index)}
                  className="border border-black p-2 hover:text-white hover:bg-black active:bg-gray-700 transition-colors"
                >
                  send message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
