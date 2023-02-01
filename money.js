const HOST = "http://116.203.61.236:4000";

const addMoneyURL = HOST + "/channels/mychannel/chaincodes/chaincode/token/buy";
const getTokenURL = HOST + "/channels/mychannel/chaincodes/chaincode/token";

const getBidsForAssetURL =
  HOST + "/channels/mychannel/chaincodes/chaincode/asset/bids";
const getAssetURL = HOST + "/collection/Market/objects";
const sellChickenURL =
  HOST + "/channels/mychannel/chaincodes/chaincode/asset/sell";
const getUsersRole = "organizations/roles";
const getUserHistory = "collection/Logs/user/history";
const getAssetsByStatus =
  "channels/mychannel/chaincodes/chaincode/assets/status";

const changeStatus =
  "channels/mychannel/chaincodes/chaincode/asset/status/change";

const addToLocalDC =
  "channels/mychannel/chaincodes/chaincode/asset/localDC/add";
const addToGlobalDC =
  "channels/mychannel/chaincodes/chaincode/asset/globalDC/add";
const getImage = "user/profile";

const getImageUser = `${HOST}/${getImage}`;
const getUsersRoleURL = `${HOST}/${getUsersRole}`;
const getUserHistoryURL = `${HOST}/${getUserHistory}`;
const changeAssetStatusURL = `${HOST}/${changeStatus}`;
const getAssetsByStatusURL = `${HOST}/${getAssetsByStatus}`;
const addToLocalDCURL = `${HOST}/${addToLocalDC}`;
const addToGlobalDCURL = `${HOST}/${addToGlobalDC}`;

const amount = document.getElementById("amount");
const addMoneyBtn = document.getElementById("add-money");
const token = localStorage.getItem("token");
const addMoneyBox = document.getElementById("timeline");
const userHistoryTable = document.getElementById("user-history-table");

const inventoryAmount = document.getElementById("inventory");
const blockedInvenory = document.getElementById("blocked-amount");
const username = document.querySelector(".profile-username");
const profileCard = document.getElementById("profile-card");
const containerfluid = document.getElementById("confirm");

const inventorySidebar = document.getElementById("inventory-sidebar");
const usernameSidebar = document.getElementById("username-sidebar");

const timelineTabSection = document.getElementById("timeline-tab-section");

const activityTabPanelSection = document.getElementById("activity");
const profileImage = document.getElementById("profile-image");

// sidebar buttons
const productionSection = document.getElementById("production-section");
const warehouseSection = document.getElementById("warehouse-section");
const requestSection = document.getElementById("request-section");
const shopSection = document.getElementById("shop-section");
const listSection = document.getElementById("list-section");
const addMoneySection = document.getElementById("add-money-section");
const historySection = document.getElementById("history-section");

const timelineNavLink = document.querySelector('[href="#timeline"]');

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

let assetsData = [];

const localDelivery = {
  name: "LocalDelivery",
  color: "badge-warning",
};

const readyToLocalDelivery = {
  name: "ReadyToLocalDelivery",
  color: "badge-warning",
};

const globalDelivery = {
  name: "GlobalDelivery",
  color: "badge-danger",
};

const readyToGlobalDelivery = {
  name: "readyToGlobalDelivery",
  color: "badge-danger",
};

const sold = {
  name: "Sold",
  color: "badge-danger",
};

let confirmBtn = null;

const addMoney = (amount) => {
  const data = {
    price: amount,
  };

  fetch(addMoneyURL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error === "null") {
        addMoneyBox.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-success" role="alert" id='alert-1'>
                ${data.result.message}
            </div>
        `
        );
        inventoryAmount.textContent = data.result.result.amount;

        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      } else {
        addMoneyBox.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-success" role="alert" id='alert-2'>
                ${data.result.message}
            </div>  
        `
        );

        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      }
    });
};

addMoneyBtn.addEventListener("click", (e) => {
  let amountToAdd = Number(amount.value);
  addMoney(amountToAdd);
  amount.value = "";
});

const carveOutUsername = (username) => {
  return username.split("@")[1];
};

const getToken = () => {
  fetch(getTokenURL, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error !== "null") {
        // for all page
        inventorySidebar.textContent = data.result?.amount;
        blockedInvenory.textContent = data.result?.blockAmount;
        // usernameSidebar.textContent = carveOutUsername(data.result?.user);
        setRoleAccess(data.result.user);
      } else {
        profileCard.insertAdjacentHTML(
          "afterbegin",
          `
                <div class="alert alert-danger" role="alert">
                    Failed to load user data;
                </div>
            `
        );
      }
    });
};

const getUser = async () => {
  let user = null;
  let res = await fetch(getTokenURL, {
    method: "GET",
    headers: headers,
  });

  let data = await res.json();
  return data.result.user;
};

const changeAssetStatusAndSell = (assetId, status, userToSell = "") => {
  const statusData = {
    id: assetId,
    status: status,
  };

  fetch(changeAssetStatusURL, {
    method: "POST",
    body: JSON.stringify(statusData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      sellChickenToCustomer(assetId, userToSell);
    });
};

const changeAssetStatus = (
  assetId,
  status,
  type = "",
  message = "",
  acceptBtn
) => {
  const statusData = {
    id: assetId,
    status: status,
  };

  fetch(changeAssetStatusURL, {
    method: "POST",
    body: JSON.stringify(statusData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      containerfluid.insertAdjacentHTML(
        "afterbegin",
        `
          <div class="alert alert-success" role="alert" id='alert-3'>
              ${message}
          </div>
      `
      );
      acceptBtn.innerHTML = "";
      acceptBtn.innerText = "Accepted";
      acceptBtn.setAttribute("disabled", true);

      let alert3 = document.getElementById("alert-3");
      setTimeout(() => alert3.remove(), 3000);
    });
};

const sellChickenToCustomer = (idx, customer) => {
  const data = {
    id: idx,
    customer: customer,
  };

  fetch(sellChickenURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result?.message.toLowerCase().includes("successful")) {
        confirmBtn.innerHTML = "";
        confirmBtn.innerText = "Confirmed";
        confirmBtn.setAttribute("disabled", true);

        containerfluid.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-success" role="alert" id='alert-3'>
                ${data.result.message}
            </div>
        `
        );

        let alert3 = document.getElementById("alert-3");
        setTimeout(() => alert3.remove(), 3000);
      } else if (data.success === false) {
        confirmBtn.innerHTML = "";
        confirmBtn.innerText = "Confirm";

        containerfluid.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-danger" role="alert" id='alert-2'>
                 something went wrong
            </div>  
        `
        );

        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      } else {
        confirmBtn.innerHTML = "";
        confirmBtn.innerText = "Confirm";

        containerfluid.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-success" role="alert" id='alert-3'>
                Something went Wrong
            </div>
        `
        );
        let alert3 = document.getElementById("alert-3");
        setTimeout(() => alert3.remove(), 3000);
      }
    });
};

const getSelectedCustomer = async (radio_name, asset_id) => {
  radio_type = document.getElementsByName(radio_name);
  confirmBtn = document.getElementById(radio_name);

  confirmBtn.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
    </div>
  </div>`;

  for (i = 0; i < radio_type.length; i++) {
    if (radio_type[i].checked) {
      let userToSell = radio_type[i].value;

      let assetObj = assetsData.filter((item) => item._id === asset_id)[0];

      changeAssetStatusAndSell(asset_id, readyToLocalDelivery.name, userToSell);
      // sellChickenToCustomer(asset_id, userToSell);
    }
  }
};

// requests of warehouse

// accept local delivert req
const acceptLDReq = (acceptBtnId, idx) => {
  let acceptBtn = document.getElementById(acceptBtnId);
  acceptBtn.innerHTML = `<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div`;

  const data = {
    id: idx,
  };

  fetch(addToLocalDCURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result?.message.toLowerCase().includes("successful")) {
        changeAssetStatus(
          idx,
          localDelivery.name,
          "local",
          data.result.message,
          acceptBtn
        );
      } else {
        acceptBtn.innerHTML = "";
        acceptBtn.innerText = "Accept";

        containerfluid.insertAdjacentHTML(
          "afterbegin",
          `
          <div class="alert alert-danger" role="alert" id='alert-2'>
           something went wrong
          </div>  
      `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      }
    });
};

// accept global delivery req
const acceptGDReq = (acceptBtnId, idx) => {
  let acceptBtn = document.getElementById(acceptBtnId);
  acceptBtn.innerHTML = `<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div`;

  const data = {
    id: idx,
  };

  fetch(addToGlobalDCURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result?.message.toLowerCase().includes("successful")) {
        changeAssetStatus(
          idx,
          globalDelivery.name,
          "global",
          data.result.message,
          acceptBtn
        );
      } else {
        acceptBtn.innerHTML = "";
        acceptBtn.innerText = "Accept";

        containerfluid.insertAdjacentHTML(
          "afterbegin",
          `
          <div class="alert alert-danger" role="alert" id='alert-2'>
           something went wrong
          </div>  
      `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      }
    });
};
// start get api image for userprofile
const setProfile = () => {
  fetch(getImageUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        profileImage.setAttribute("src", data.message[0].imageUrl);
      }
    });
};
// end get api image for userprofile

const setRoleAccess = (currUser) => {
  fetch(getUsersRoleURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        let userRole = data.message.filter(
          (userRoleObj) => userRoleObj.username === currUser
        )[0];
        usernameSidebar.textContent = userRole.nickname;
        setProfile();
        // console.log(userRole.role);

        switch (userRole.role) {
          case "Factory":
            listSection.style.display = "block";
            productionSection.style.display = "block";
            historySection.style.display = "block";

            return;

          case "Warehouse":
            warehouseSection.style.display = "block";
            shopSection.style.display = "block";
            requestSection.style.display = "block";

            requestTabSection.style.display = "block";

            requestTabPanelSection.classList.add("active");
            requestTabSection.classList.add("active");
            // window.location.replace("./Warehouse.html");
            setRequests();
            return;

          case "Wholesaler":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            activityTabSection.style.display = "block";
            timelineTabSection.style.display = "block";

            // activityTabPanelSection.classList.add("active");
            // activityTabSection.classList.add("active");

            requestTabSection.style.display = "block";

            requestTabPanelSection.classList.add("active");
            requestTabSection.classList.add("active");
            return;

          case "Retailer":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            activityTabSection.style.display = "block";
            timelineTabSection.style.display = "block";

            // activityTabPanelSection.classList.add("active");
            // activityTabSection.classList.add("active");

            requestTabSection.style.display = "block";

            requestTabPanelSection.classList.add("active");
            requestTabSection.classList.add("active");
            return;

          case "LocalDelivery":
            listSection.style.display = "block";
            requestSection.style.display = "block";

            return;

          case "GlobalDelivery":
            listSection.style.display = "block";
            requestSection.style.display = "block";

            getAssetsByStatusNameG(readyToGlobalDelivery.name);
            return;

          case "Customer":
            listSection.style.display = "block";
            timelineTabSection.style.display = "block";
            timelineTabSection.classList.add("active");
            shopSection.style.display = "block";
            return;
        }
      }
    });
};

const formatUserHistoryDateField = (dateStr) => {
  // format --> Fri Nov 18 2022 23:12:00 GMT+0000 (Coordinated Universal Time)
  index = dateStr.indexOf("GMT");
  return dateStr.substring(4, index - 1);
};

window.addEventListener("load", () => {
  getToken();
  // await setRequests();
  addMoney();
});
