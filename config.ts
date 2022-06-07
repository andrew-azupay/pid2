export const getServerConfig = () => {
  const secret = process.env.AUTHSIGNAL_SECRET;

  if (!secret) {
    throw new Error("AUTHSIGNAL_SECRET is not set");
  }

  return {
    secret,
  };
};

export const getBrowserConfig = () => {
  const publishableKey = process.env.NEXT_PUBLIC_AUTHSIGNAL_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("NEXT_PUBLIC_AUTHSIGNAL_PUBLISHABLE_KEY is not set");
  }

  return {
    publishableKey,
  };
};
