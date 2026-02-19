import React, { useState } from "react";

type AdminNoteSectionProps = {
    note: string;
    onSave: (note: string) => Promise<void>;
    loading: boolean;
};

const AdminNoteSection: React.FC<AdminNoteSectionProps> = ({
    note,
    onSave,
    loading,
}) => {
    const [noteModalOpen, setNoteModalOpen] = useState(false);
    const [noteText, setNoteText] = useState(note || "");

    const handleSave = async () => {
        await onSave(noteText);
        setNoteModalOpen(false);
    };

    return (
        <div className="bg-yellow-50 dark:bg-yellow-900/10 px-6 py-6 border-t border-yellow-100 dark:border-yellow-900/30">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-yellow-800 dark:text-yellow-500 uppercase tracking-wider">
                    Admin Internal Note
                </h2>
                <button
                    onClick={() => {
                        setNoteText(note || "");
                        setNoteModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                    {note ? "Edit Note" : "Add Note"}
                </button>
            </div>

            {note ? (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-yellow-900/30 shadow-sm">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {note}
                    </p>
                </div>
            ) : (
                <p className="text-sm text-yellow-700 dark:text-yellow-500 italic">
                    No internal notes added yet.
                </p>
            )}

            {/* Admin Note Modal */}
            {noteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            {note ? "Edit Admin Note" : "Add Admin Note"}
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            This note is for internal use only and will not be visible to the
                            user.
                        </p>

                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Enter internal note..."
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none resize-y min-h-[120px]"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => {
                                    setNoteModalOpen(false);
                                    setNoteText(note || "");
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Note"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNoteSection;
