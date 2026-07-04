import { StatusBadge } from "@shared/components/common/StatusBadge";

export function CustomerStatus({ isblocked }) {
  return isblocked ? (
    <StatusBadge status="BANNED" label="Banned" />
  ) : (
    <StatusBadge status="ACTIVE" label="Active" />
  );
}

export default CustomerStatus;
