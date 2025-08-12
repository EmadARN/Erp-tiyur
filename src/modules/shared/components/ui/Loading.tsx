export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <div
        style={{
          width: "30%",
          height: "3px",
          backgroundColor: "#1111",
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <span
          style={{
            display: "block",
            height: "100%",
            width: "50%", // طول تکه متحرک
            background: "linear-gradient(90deg, #444, #777)",
            borderRadius: "4px",
            position: "absolute",
            animation: "loadingAnim 1.5s linear infinite",
          }}
        ></span>
      </div>

      {/* استایل انیمیشن */}
      <style>
        {`
          @keyframes loadingAnim {
            0% { left: -30%; }
            100% { left: 100%; }
          }
        `}
      </style>
    </div>
  );
}
