import { AnggotaKeluarga, KartuKeluarga } from "@/types/warga";

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function getInitials(name: string): string {
    return name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
}

export function getKepalaKeluarga(kk: KartuKeluarga): AnggotaKeluarga {
    return kk.anggota.find((a) => a.hubungan === "Kepala Keluarga") ?? kk.anggota[0];
}
