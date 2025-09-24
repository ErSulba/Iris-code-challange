export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 px-4">
      <div className="bg-transparent border border-iris-border rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-iris-gray rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-iris-gray rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-iris-gray rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
