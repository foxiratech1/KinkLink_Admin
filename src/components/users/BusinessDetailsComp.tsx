import { useState } from "react";
import toast from "react-hot-toast";
import { UserDetail, BusinessDetails } from "../../types/user.types";
import {
  updateUserBlockStatus,
  updateUserRegiStatusApi,
  deleteUserVerificationApi,
  updateUserVerificationNoteApi,
  adminRequestUserIdApi,
  varicationSuspend,
} from "../../api/usersapi";
import { useNavigate } from "react-router";
import DetailItem from "./shared/DetailItem";
import VerificationSection from "./shared/VerificationSection";
import AdminNoteSection from "./shared/AdminNoteSection";
import ImageModal from "./shared/ImageModal";
import { getVerificationStatusColor } from "../../utils/statusUtils";

type BusinessDetailsCompProps = {
  user: UserDetail;
  businessProfile: BusinessDetails;
  verification?: any;
  onUpdate: () => void;
};

const BusinessDetailsComp = ({
  user,
  businessProfile,
  verification,
  onUpdate,
}: BusinessDetailsCompProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [imageModal, setImageModal] = useState<string | null>(null);

  const handleAdminRequestUserId = async () => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }

    setLoading(true);
    try {
      await adminRequestUserIdApi(verification._id, user._id);
      toast.success("User ID request sent successfully");
      onUpdate();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to request User ID",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (noteText: string) => {
    setLoading(true);
    try {
      await updateUserVerificationNoteApi(user._id, noteText);
      toast.success("Note updated successfully");
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (type: "selfie" | "id") => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    setLoadingStates((prev) => ({ ...prev, [`approve-${type}`]: true }));
    try {
      await updateUserRegiStatusApi(
        user._id,
        verification._id,
        type,
        "Approve",
      );
      toast.success(
        `${type === "selfie" ? "Selfie" : "ID"} approved successfully`,
      );
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [`approve-${type}`]: false }));
    }
  };

  const handleReject = async (type: "selfie" | "id", reason: string) => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [`reject-${type}`]: true }));
    try {
      await updateUserRegiStatusApi(
        user._id,
        verification._id,
        type,
        "Reject",
        reason,
      );

      toast.success(
        `${type === "selfie" ? "Selfie" : "ID"} rejected successfully`,
      );
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
      throw err;
    } finally {
      setLoadingStates((prev) => ({ ...prev, [`reject-${type}`]: false }));
    }
  };
  const handleVerficationSuspend = async () => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    setLoadingStates((prev) => ({ ...prev, [`suspend`]: true }));
    try {
      await varicationSuspend(verification._id);
      toast.success(`Verification suspended successfully !`);
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
      throw err;
    } finally {
      setLoadingStates((prev) => ({ ...prev, [`suspend`]: false }));
    }
  };
  const handleDeleteVerification = async () => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this verification?",
    );
    if (!confirmDelete) return;
    setLoading(true);
    try {
      await deleteUserVerificationApi(verification._id);
      toast.success("Verification deleted successfully");
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async () => {
    setLoading(true);
    try {
      const newBlockStatus = !user.isBlocked;
      await updateUserBlockStatus(user._id, newBlockStatus);
      toast.success(
        newBlockStatus
          ? "Business blocked successfully"
          : "Business unblocked successfully",
      );
      onUpdate();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update block status !",
      );
    } finally {
      setLoading(false);
    }
  };

  const formatBusinessCategory = (category: string) => {
    if (!category) return "-";
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBlockToggle}
              disabled={loading}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                user.isBlocked
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50"
                  : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50"
              }`}
            >
              {user.isBlocked ? "Unblock Business" : "Block Business"}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              User Information
            </h2>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getVerificationStatusColor(verification?.overallStatus)}`}
            >
              {verification?.overallStatus}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <DetailItem label="User ID" value={user._id} />
            <DetailItem label="Email" value={user.email} highlight />
            <DetailItem label="Role" value={user.role} />
            <DetailItem label="Telephone" value={user.telephone} />
            <DetailItem
              label="Online Status"
              value={user.isOnline ? "Online" : "Offline"}
            />
            <DetailItem
              label="Joined Date"
              value={formatDate(user.createdAt)}
            />
            <DetailItem
              label="Last Updated"
              value={formatDate(user.updatedAt)}
            />
            <DetailItem
              label="Blocked Status"
              value={user.isBlocked ? "Blocked" : "Active"}
              highlight={user.isBlocked}
            />
            <DetailItem
              label="Terms Agreed"
              value={user.isAgreed ? "Yes" : "No"}
            />
            <DetailItem
              label="Profile Complete"
              value={user.isProfileComplete ? "Complete" : "Incomplete"}
            />
            <DetailItem
              label="Account Status"
              value={user.isDeleted ? "Deleted" : "Active"}
            />
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
            Business Profile
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <DetailItem
                label="Business Name"
                value={businessProfile.businessName}
                highlight
              />
              <DetailItem
                label="Business Category"
                value={formatBusinessCategory(businessProfile.businessCategory)}
              />
              <DetailItem label="Telephone" value={businessProfile.telephone} />
              <DetailItem
                label="Subscription Plan"
                value={businessProfile.subscriptionPlan}
              />
              <DetailItem
                label="First Month Free"
                value={
                  businessProfile.isFirstMonthFreeUsed ? "Used" : "Available"
                }
              />
              <DetailItem
                label="Profile Created"
                value={formatDate(businessProfile.createdAt)}
              />
              <DetailItem
                label="Last Updated"
                value={formatDate(businessProfile.updatedAt)}
              />
              <DetailItem
                label="Verification ID"
                value={businessProfile.verificationId}
              />
            </div>
          </div>
        </div>

        <VerificationSection
          verification={verification}
          onApprove={handleApprove}
          onReject={handleReject}
          onSuspend={handleVerficationSuspend}
          onDelete={handleDeleteVerification}
          loadingStates={loadingStates}
          loadingGlobal={loading}
          onImageClick={setImageModal}
        />

        <AdminNoteSection
          note={user.adminNote || ""}
          onSave={handleUpdateNote}
          loading={loading}
        />
      </div>
      <div className="px-6 py-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-end">
          <button
            onClick={handleAdminRequestUserId}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
          >
            Request User ID
          </button>
        </div>
      </div>

      {imageModal && (
        <ImageModal imageUrl={imageModal} onClose={() => setImageModal(null)} />
      )}
    </div>
  );
};

export default BusinessDetailsComp;
