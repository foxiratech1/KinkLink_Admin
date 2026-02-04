import { useState } from "react";
import { EventType } from "../../types/event.types";
import AddEventComp from "../../components/events/AddEventComp";
import EventListComp from "../../components/events/EventListComp";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const EventManager = () => {
    const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleSuccess = () => {
        setEditingEvent(null);
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleEdit = (event: EventType) => {
        setEditingEvent(event);
    };

    const handleCancelEdit = () => {
        setEditingEvent(null);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <PageBreadcrumb
                pageTitle="Event Management"
                description="Manage event types"
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Side - Add/Edit Form */}
                <div className="lg:col-span-1">
                    <AddEventComp
                        editingEvent={editingEvent}
                        onSuccess={handleSuccess}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>

                {/* Right Side - Event List */}
                <div className="lg:col-span-2">
                    <EventListComp
                        refreshTrigger={refreshTrigger}
                        onEdit={handleEdit}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventManager;
