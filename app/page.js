"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const viewports = {
  desktop: {
    label: "Desktop",
    width: "100%",
    maxWidth: 1180
  },
  mobile: {
    label: "Mobile",
    width: 390,
    maxWidth: 390
  }
};

const paymentMethodOptions = [
  {
    id: "nextpay",
    label: "nextpay"
  },
  {
    id: "pay-in-3",
    label: "pay in 3"
  },
  {
    id: "card",
    label: "Credit / Debit Card"
  },
  {
    id: "paypal",
    label: "Paypal"
  },
  {
    id: "apple-pay",
    label: "Apple Pay"
  },
  {
    id: "giftcard",
    label: "Giftcard / eVoucher"
  }
];

const defaultPaymentMethods = Object.fromEntries(paymentMethodOptions.map((method) => [method.id, true]));
const defaultThemeStylesheet = "Next_Revision.vars.css";
const themeStorageKey = "checkout-config-theme-stylesheet";
const themeStylesheetOptions = [
  {
    file: "Next_Revision.vars.css",
    label: "Next Revision"
  },
  {
    file: "Next.vars.css",
    label: "Next"
  },
  {
    file: "Next_Vision.vars.css",
    label: "Next Vision"
  },
  {
    file: "BathAndBodyWorks.vars.css",
    label: "Bath & Body Works"
  },
  {
    file: "FatFace.vars.css",
    label: "FatFace"
  },
  {
    file: "Gap.vars.css",
    label: "Gap"
  },
  {
    file: "Gap_Vision.vars.css",
    label: "Gap Vision"
  },
  {
    file: "JoJo.vars.css",
    label: "JoJo"
  },
  {
    file: "JoJo_Vision.vars.css",
    label: "JoJo Vision"
  },
  {
    file: "Joules.vars.css",
    label: "Joules"
  },
  {
    file: "Logo.vars.css",
    label: "Logo"
  },
  {
    file: "Made.vars.css",
    label: "Made"
  },
  {
    file: "Reiss.vars.css",
    label: "Reiss"
  },
  {
    file: "Reiss_Vision.vars.css",
    label: "Reiss Vision"
  },
  {
    file: "TheSet.vars.css",
    label: "The Set"
  },
  {
    file: "VictoriasSecret.vars.css",
    label: "Victoria's Secret"
  }
];
const themeStylesheetFiles = new Set(themeStylesheetOptions.map((option) => option.file));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const prototypeStartPath = `${basePath}/signin-register/`;

export default function Home() {
  const [activeSettingsTab, setActiveSettingsTab] = useState("features");
  const [viewport, setViewport] = useState("desktop");
  const [expressPaymentsEnabled, setExpressPaymentsEnabled] = useState(true);
  const [rememberLastPaymentEnabled, setRememberLastPaymentEnabled] = useState(false);
  const [existingUserFlowEnabled, setExistingUserFlowEnabled] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(defaultPaymentMethods);
  const [themeStylesheet, setThemeStylesheet] = useState(defaultThemeStylesheet);
  const previewRef = useRef(null);
  const currentViewport = viewports[viewport];
  const applyPreviewSettings = useCallback(() => {
    const frame = previewRef.current;

    if (!frame?.contentWindow) {
      return;
    }

    frame.contentWindow.postMessage(
      {
        type: "checkout-config:update",
        config: {
          expressPaymentsEnabled,
          rememberLastPaymentEnabled,
          existingUserFlowEnabled,
          themeStylesheet,
          paymentMethods
        }
      },
      window.location.origin
    );
  }, [expressPaymentsEnabled, rememberLastPaymentEnabled, existingUserFlowEnabled, themeStylesheet, paymentMethods]);

  useEffect(() => {
    const storedThemeStylesheet = window.localStorage.getItem(themeStorageKey);

    if (themeStylesheetFiles.has(storedThemeStylesheet)) {
      setThemeStylesheet(storedThemeStylesheet);
    }
  }, []);

  useEffect(() => {
    applyPreviewSettings();
  }, [applyPreviewSettings, viewport]);

  const handleThemeStylesheetChange = (event) => {
    const nextThemeStylesheet = event.target.value;

    setThemeStylesheet(nextThemeStylesheet);
    window.localStorage.setItem(themeStorageKey, nextThemeStylesheet);
  };

  return (
    <main className="configurator-shell">
      <aside className="settings-panel" aria-label="Checkout settings">
        <div className="settings-tabs" role="tablist" aria-label="Settings sections">
          <button
            className={`settings-tab${activeSettingsTab === "features" ? " is-active" : ""}`}
            type="button"
            role="tab"
            aria-controls="features-panel"
            aria-selected={activeSettingsTab === "features"}
            onClick={() => setActiveSettingsTab("features")}
          >
            <span className="tab-icon tab-icon-features" aria-hidden="true" />
            Features
          </button>
          <button
            className={`settings-tab${activeSettingsTab === "style" ? " is-active" : ""}`}
            type="button"
            role="tab"
            aria-controls="style-panel"
            aria-selected={activeSettingsTab === "style"}
            onClick={() => setActiveSettingsTab("style")}
          >
            <span className="tab-icon tab-icon-style" aria-hidden="true" />
            Style
          </button>
        </div>

        {activeSettingsTab === "features" ? (
          <div className="settings-content" id="features-panel" role="tabpanel" aria-label="Features">
            <section className="settings-group" aria-labelledby="payment-setup-title">
              <h2 id="payment-setup-title">Payment setup</h2>
              <label className="setting-row" htmlFor="express-payments">
                <span>Express Payments</span>
                <span className="toggle-control">
                  <input
                    id="express-payments"
                    type="checkbox"
                    checked={expressPaymentsEnabled}
                    onChange={(event) => setExpressPaymentsEnabled(event.target.checked)}
                  />
                  <span className="toggle-track" aria-hidden="true">
                    <span className="toggle-thumb" />
                  </span>
                </span>
              </label>
              <label className="setting-row" htmlFor="remember-last-payment">
                <span>Remember last payment</span>
                <span className="toggle-control">
                  <input
                    id="remember-last-payment"
                    type="checkbox"
                    checked={rememberLastPaymentEnabled}
                    onChange={(event) => setRememberLastPaymentEnabled(event.target.checked)}
                  />
                  <span className="toggle-track" aria-hidden="true">
                    <span className="toggle-thumb" />
                  </span>
                </span>
              </label>
              <label className="setting-row" htmlFor="existing-user-flow">
                <span>Existing User Flow</span>
                <span className="toggle-control">
                  <input
                    id="existing-user-flow"
                    type="checkbox"
                    checked={existingUserFlowEnabled}
                    onChange={(event) => setExistingUserFlowEnabled(event.target.checked)}
                  />
                  <span className="toggle-track" aria-hidden="true">
                    <span className="toggle-thumb" />
                  </span>
                </span>
              </label>
            </section>

            <section className="settings-group" aria-labelledby="payment-methods-title">
              <h2 id="payment-methods-title">Payment methods</h2>
              {paymentMethodOptions.map((method) => (
                <label className="setting-row" htmlFor={`payment-method-${method.id}`} key={method.id}>
                  <span>{method.label}</span>
                  <span className="toggle-control">
                    <input
                      id={`payment-method-${method.id}`}
                      type="checkbox"
                      checked={paymentMethods[method.id]}
                      onChange={(event) => {
                        setPaymentMethods((currentPaymentMethods) => ({
                          ...currentPaymentMethods,
                          [method.id]: event.target.checked
                        }));
                      }}
                    />
                    <span className="toggle-track" aria-hidden="true">
                      <span className="toggle-thumb" />
                    </span>
                  </span>
                </label>
              ))}
            </section>
          </div>
        ) : (
          <div className="settings-content" id="style-panel" role="tabpanel" aria-label="Style">
            <section className="settings-group" aria-labelledby="realm-style-title">
              <h2 id="realm-style-title">Realm style</h2>
              <label className="setting-field" htmlFor="realm-stylesheet">
                <span>Stylesheet</span>
                <span className="select-control">
                  <select id="realm-stylesheet" value={themeStylesheet} onChange={handleThemeStylesheetChange}>
                    {themeStylesheetOptions.map((option) => (
                      <option value={option.file} key={option.file}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </section>
          </div>
        )}
      </aside>

      <section className="preview-stage" aria-label="Checkout preview">
        <div
          className={`browser-preview browser-preview-${viewport}`}
          style={{
            width: currentViewport.width,
            maxWidth: currentViewport.maxWidth
          }}
        >
          <div className="browser-chrome" aria-hidden="true">
            <span className="chrome-dot chrome-dot-red" />
            <span className="chrome-dot chrome-dot-yellow" />
            <span className="chrome-dot chrome-dot-green" />
            <span className="chrome-address" />
          </div>
          <iframe
            ref={previewRef}
            className="checkout-preview"
            title={`${currentViewport.label} checkout preview`}
            src={prototypeStartPath}
            onLoad={applyPreviewSettings}
          />
        </div>

        <div className="viewport-toggle" role="group" aria-label="Preview screen size">
          {Object.entries(viewports).map(([key, item]) => (
            <button
              key={key}
              className={`viewport-button${viewport === key ? " is-active" : ""}`}
              type="button"
              aria-label={`${item.label} preview`}
              aria-pressed={viewport === key}
              title={`${item.label} preview`}
              onClick={() => setViewport(key)}
            >
              <span className={`viewport-icon viewport-icon-${key}`} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
