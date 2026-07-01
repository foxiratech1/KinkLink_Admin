import PageMeta from "../../components/common/PageMeta";
import StickersComponent from "../../components/stickers/StickersComponent";

export default function StickersPage() {
  return (
    <>
      <PageMeta
        title="Stickers Management | KinkLink Admin"
        description="Monitor user sticker packs, view usage metrics, and create new sticker packs."
      />
      <StickersComponent />
    </>
  );
}
