type CSPErrorEvent = SecurityPolicyViolationEvent & {
    disposition?: 'enforce' | 'report';
};
export declare const isReceiverCSPError: (e: CSPErrorEvent) => boolean;
export declare function loadAjsClassicFallback(): Promise<void>;
export {};
//# sourceMappingURL=csp-detection.d.ts.map