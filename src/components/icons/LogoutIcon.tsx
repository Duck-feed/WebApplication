import React from "react";

function LogoutIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4.99976V2.99976C12 2.46932 11.7893 1.96061 11.4142 1.58554C11.0391 1.21047 10.5304 0.999756 10 0.999756H3C2.46957 0.999756 1.96086 1.21047 1.58579 1.58554C1.21071 1.96061 1 2.46932 1 2.99976V14.9998C1 15.5302 1.21071 16.0389 1.58579 16.414C1.96086 16.789 2.46957 16.9998 3 16.9998H10C10.5304 16.9998 11.0391 16.789 11.4142 16.414C11.7893 16.0389 12 15.5302 12 14.9998V12.9998M7 8.99976H19M19 8.99976L16 5.99976M19 8.99976L16 11.9998"
        stroke="#FF0000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
export default React.memo(LogoutIcon);
