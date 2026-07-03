import { Check } from "lucide-react";
import { StatusBadge } from "@shared/components/common/StatusBadge";
import { ORDER_STATUS_DISPLAY_MAP } from "@shared/utils/constants";
import "./OrderStatus.css";

function resolveDisplay(status) {
  return ORDER_STATUS_DISPLAY_MAP[status] || { key: status, label: status };
}

export function OrderStatus({ status }) {
  const display = resolveDisplay(status);
  return <StatusBadge status={display.key} label={display.label} />;
}

const STEPPER_STEPS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

export function OrderStatusStepper({ status }) {
  const display = resolveDisplay(status);

  if (display.key === "CANCELLED") {
    return (
      <div
        className="order-status-stepper--cancelled d-flex justify-content-center align-items-center"
        role="status"
      >
        Cancelled
      </div>
    );
  }

  const currentIndex = STEPPER_STEPS.indexOf(display.key);

  return (
    <div
      className="order-status-stepper d-flex w-100 align-items-start"
      role="list"
    >
      {STEPPER_STEPS.map((step, index) => {
        const isFilled = currentIndex >= 0 && index <= currentIndex;
        const isLineFilled = currentIndex >= 0 && index < currentIndex;
        const isLastStep = index === STEPPER_STEPS.length - 1;
        const stepLabel = resolveDisplay(step).label;

        return (
          <div
            key={step}
            role="listitem"
            className="order-status-stepper__step d-flex flex-column align-items-center flex-fill"
          >
            <div className="order-status-stepper__track d-flex align-items-center w-100">
              <span
                className={`order-status-stepper__circle d-flex justify-content-center align-items-center ${
                  isFilled
                    ? "order-status-stepper__circle--filled"
                    : "order-status-stepper__circle--outline"
                }`}
              >
                {isFilled && (
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                )}
              </span>

              {!isLastStep && (
                <span
                  aria-hidden="true"
                  className={`order-status-stepper__line ${
                    isLineFilled ? "order-status-stepper__line--filled" : ""
                  }`}
                />
              )}
            </div>

            <span
              className={`order-status-stepper__label text-center ${
                isFilled ? "order-status-stepper__label--active" : ""
              }`}
            >
              {stepLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default OrderStatus;
