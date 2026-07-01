import { useState } from "react";
import { ForumCategory } from "../../types/forum.types";
import AddForumCategoryComp from "../../components/forums/AddForumCategoryComp";
import ForumCategoryListComp from "../../components/forums/ForumCategoryListComp";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const ForumsCategoryPage = () => {
    const [editingCategory, setEditingCategory] = useState<ForumCategory | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleSuccess = () => {
        setEditingCategory(null);
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleEdit = (category: ForumCategory) => {
        setEditingCategory(category);
    };

    const handleCancelEdit = () => {
        setEditingCategory(null);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <PageBreadcrumb
                pageTitle="Forums Category Management"
                description="Manage forum categories for the application"
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <AddForumCategoryComp
                        editingCategory={editingCategory}
                        onSuccess={handleSuccess}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>

                {/* Right Side - Category List */}
                <div className="lg:col-span-2">
                    <ForumCategoryListComp
                        refreshTrigger={refreshTrigger}
                        onEdit={handleEdit}
                    />
                </div>
            </div>
        </div>
    );
};

export default ForumsCategoryPage;
