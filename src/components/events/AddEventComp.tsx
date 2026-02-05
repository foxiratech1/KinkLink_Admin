import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addEventTypeApi, updateEventTypeApi } from "../../api/eventapi";
import { EventType } from "../../types/event.types";
import Button from "../ui/button/Button";

type AddEventCompProps = {
    editingEvent: EventType | null;
    onSuccess: () => void;
    onCancelEdit: () => void;
};

const AddEventComp = ({ editingEvent, onSuccess, onCancelEdit }: AddEventCompProps) => {
    const [eventType, setEventType] = useState("");
    const [category, setCategory] = useState("event");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editingEvent) {
            setEventType(editingEvent.eventType);
            setCategory(editingEvent.category || "event");
        } else {
            setEventType("");
            setCategory("event");
        }
        setError("");
    }, [editingEvent]);

    const validateForm = (): boolean => {
        if (!eventType.trim()) {
            setError("Event type is required");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            if (editingEvent) {
                // Update existing event type
                await updateEventTypeApi(editingEvent._id, {
                    eventType: eventType.trim(),
                    category,
                });
                toast.success("Event type updated successfully");
            } else {
                // Add new event type
                await addEventTypeApi({
                    eventType: eventType.trim(),
                    category,
                });
                toast.success("Event type added successfully");
            }
            setEventType("");
            setCategory("event");
            setError("");
            onSuccess();
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message ||
                (editingEvent ? "Failed to update event type" : "Failed to add event type");
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEventType("");
        setCategory("event");
        setError("");
        onCancelEdit();
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {editingEvent ? "Edit Event Type" : "Add New Event Type"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        disabled={loading}
                    >
                        <option value="event">Event</option>
                        <option value="eventMeet">Event Meet</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="eventType"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Event Type Name
                    </label>
                    <input
                        type="text"
                        id="eventType"
                        value={eventType}
                        onChange={(e) => {
                            setEventType(e.target.value);
                            setError("");
                        }}
                        className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-brand-500 dark:border-gray-700"
                            } dark:bg-gray-800 dark:text-white`}
                        placeholder="Enter event type"
                        disabled={loading}
                    />
                    {error && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? "Saving..." : editingEvent ? "Update Event" : "Add Event"}
                    </Button>
                    {editingEvent && (
                        <Button
                            type="button"
                            variant="outline"
                            size="md"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddEventComp;
