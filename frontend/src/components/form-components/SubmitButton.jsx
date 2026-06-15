import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

function SubmitButton({
  text = "common.submit",
  loading = false,
}) {
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        md:w-auto
        px-8
        py-3
        rounded-xl
        bg-green-500
        text-white
        font-semibold
        hover:bg-green-600
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2
            size={18}
            className="animate-spin"
          />
          {t("common.uploading")}
        </span>
      ) : (
        t(text)
      )}
    </button>
  );
}

export default SubmitButton;