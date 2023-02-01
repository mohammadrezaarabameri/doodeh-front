const HOST = "http://116.203.61.236:4000";

const getAssetsByOwner = "channels/mychannel/chaincodes/chaincode/assets/owner";
const getImage = "user/profile";

const getChickenHistory =
  "channels/mychannel/chaincodes/chaincode/asset/history";
const getTokenEndpoint = "channels/mychannel/chaincodes/chaincode/token";
const getUsersRole = "organizations/roles";
const getAssetHistory = "channels/mychannel/chaincodes/chaincode/asset/history";
const setChickenForSale =
  "channels/mychannel/chaincodes/chaincode/collection/Market/asset/public";

const changeStatus =
  "channels/mychannel/chaincodes/chaincode/asset/status/change";

const getImageUser = `${HOST}/${getImage}`;
const getAssetsURL = `${HOST}/${getAssetsByOwner}`;
const getChickenHistoryURL = `${HOST}/${getChickenHistory}`;
const getTokenURL = `${HOST}/${getTokenEndpoint}`;
const getUsersRoleURL = `${HOST}/${getUsersRole}`;
const getAssetHistoryURL = `${HOST}/${getAssetHistory}`;
const setChickenForSaleURL = `${HOST}/${setChickenForSale}`;
const changeAssetStatusURL = `${HOST}/${changeStatus}`;

const warehouseTableList = document.getElementById("warehouse-list-table");
const warehouseTableStatusList = document.getElementById(
  "warehouse-list-status-table"
);
const modalBody = document.getElementById("modal-body");
const modalTitle = document.getElementsByClassName("modal-title")[0];
const save = document.getElementById("save");
const card = document.getElementsByClassName("content")[0];

const profileImage = document.getElementById("profile-image");

// meta mask
const metaMaskSection = document.getElementById("connect-metamask-section");
const metaMaskBtn = document.getElementById("metamask-connect-btn");
const walletAddr = document.getElementById("wallet-address");
const walletBalance = document.getElementById("wallet-balance");

const metaMaskDropdownSection = document.getElementById("metamask-dropdown");
const metaMaskdropdownItems = document.getElementsByClassName(
  "metamask-dropdown-items"
);

for (let i = 0; i < metaMaskdropdownItems.length; i++) {
  metaMaskdropdownItems[i].addEventListener("click", (e) =>
    e.stopPropagation()
  );
}

// sidebar buttons
const productionSection = document.getElementById("production-section");
const warehouseSection = document.getElementById("warehouse-section");
const requestSection = document.getElementById("request-section");
const shopSection = document.getElementById("shop-section");
const listSection = document.getElementById("list-section");
const addMoneySection = document.getElementById("add-money-section");
const historySection = document.getElementById("history-section");

const inventorySidebar = document.getElementById("inventory-sidebar");
const blockedInvenory = document.getElementById("blocked-amount");
const usernameSidebar = document.getElementById("username-sidebar");

const token = localStorage.getItem("token");

const headerReq = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

let modalSignal = null;
let assetData = null;
let assetId = null;
let assetPrice = null;
let selectedAssets = [];
let username = null;

const warehouse = {
  name: "Warehouse",
  color: "badge-success",
};

const readyToLocalDelivery = {
  name: "ReadyToLocalDelivery",
  color: "badge-warning",
};

const readyToSale = {
  name: "ReadyToSale",
  color: "badge-info",
};

const AssetStatus = [
  {
    name: warehouse.name,
    color: warehouse.color,
  },
  {
    name: readyToSale.name,
    color: readyToSale.color,
  },
];

const giveStatusColor = (data) => {
  for (let i = 0; i < data.result.length; i++) {
    if (data.result[i].status === warehouse.name) {
      data.result[i].statusColor = warehouse.color;
    } else if (data.result[i].status === readyToSale.name) {
      data.result[i].statusColor = readyToSale.color;
    } else if (data.result[i].status === readyToLocalDelivery.name) {
      data.result[i].statusColor = readyToLocalDelivery.color;
    }
  }
  return data;
};

const getAllAssets = async () => {
  const res = await fetch(getAssetsURL, {
    headers: headerReq,
  });
  const data = await res.json();

  let colorizedData = giveStatusColor(data);

  return colorizedData.result;
};

const minimizeDateStr = (dateStr) => {
  let a = dateStr.replace("UTC", "");
  return a.substring(0, a.lastIndexOf("+") - 1);
};

// modal --> view asset history
const setModalOnView = () => {
  modalBody.innerHTML = "";
  modalTitle.textContent = "History";

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(getAssetHistoryURL + `?id=${assetId}`, config)
    .then((res) => res.json())
    .then((data) => {
      let results = data.result;

      results.forEach((item) => {
        modalBody.insertAdjacentHTML(
          "afterbegin",
          `
                    <!-- Timelime example  -->

                        <!-- The time line -->
                        <div class="timeline">
                          <!-- timeline time label -->
                          <div class="time-label1">
                            <span class="bg-warning">Oil-ID:${item.asset.SerialNumber.substring(
                              0,
                              10
                            )}</span>
                            </div> 

                          <!-- /.timeline-label -->
                          <!-- timeline item -->
                          <div>
                            <!-- <i class="fas fa-envelope bg-blue"></i> -->
                            <div class="timeline-item">
                              <span class="time">
                              <i class="fas fa-clock"></i> ${minimizeDateStr(
                                item.timestamp
                              )}</span>
                              
                              ${
                                item.asset.status !== ""
                                  ? `Status: ${item.asset.status}<br/>`
                                  : ""
                              }
                              ${
                                item.asset.price !== 0
                                  ? `Price: ${item.asset.price} <br />`
                                  : ""
                              }

                              Owner: ${item.asset.owner}
                              <br/>

                              ${
                                item.asset.forSale
                                  ? `For Sale: ${item.asset.forSale}<br/>`
                                  : ""
                              }
                              
                              Asset-Step: "${item.asset.txType}"
                            
                            <!-- loop -->
                            
                            <!-- loop -->
                             
                            </div>
                          </div>
                          <!-- END timeline item -->
                          <!-- timeline item -->
                         
                          
                         
                              
                          <!-- END timeline item -->
                         
                        </div>
                      </div>
                      <!-- /.col -->
                    </div>
                    </div>
                    </div>
                    <!-- /.timeline -->
                    
          
                          `
        );
      });
    });

  save.style.display = "none";
};

const setModalOnMetadataView = () => {
  modalBody.innerHTML = "";
  modalTitle.textContent = "Metadata";

  let assetObj = assetData.filter((asset) => asset.id === assetId)[0];
  if (assetObj.attrs.length > 0) {
    modalBody.insertAdjacentHTML(
      "beforeend",
      `
        <table
        class="table table-bordered table-striped"
        style="max-width: 100%"
        id="metadata-list-table"
      >
      <thead>
      <tr>
          <th scope="col">attribute</th>
          <th scope="col">Value</th>
          <th scope="col">Instruction</th>
      </tr>
      </thead>
        <tbody id="metadata-list"></tbody>
      </table>
        `
    );

    let metaDataList = document.getElementById("metadata-list");

    assetObj.attrs.forEach((item) => {
      metaDataList.insertAdjacentHTML(
        "beforeend",
        `                
              <td>${item.key}</td>
              <td>${item.value}</td>
              <td>${item.instruction}</td>
            `
      );
    });
  } else {
    modalBody.insertAdjacentHTML(
      "beforeend",
      `
      <h3>There's No data</h3>
    `
    );
  }
  save.style.display = "none";
};

const changeStatusColorOnServer = (assetId, selectedVal) => {
  const statusData = {
    id: assetId,
    status: selectedVal,
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
      if ($("#modal-default").hasClass("show")) {
        $("#modal-default").modal("toggle");
      }
    });
};

const setChickenForSaleReq = (assId, price) => {
  const data = {
    assetId: assId,
    price: price,
  };

  fetch(setChickenForSaleURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 401) {
        location.replace("../../login-v2.html");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if ($("#modal-default").hasClass("show")) {
        $("#modal-default").modal("toggle");
      }

      if (card.getElementsByClassName("alert").length !== 0) {
        alerts = card.getElementsByClassName("alert");
        for (let index = 0; index < alerts.length; index++) {
          alerts[index].remove();
        }
      }

      // TODO: change required
      if (data.result === null || data.success == false) {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Status change failed
        </div>
        `
        );
        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      } else {
        let assetIndex = assetData.findIndex((obj) => obj.id === assId);

        assetData[assetIndex].status = readyToSale.name;
        assetData[assetIndex].price = price;
        assetData[assetIndex].statusColor = readyToSale.color;
        changeStatusColorOnServer(assId, readyToSale.name);

        warehouseTableList.innerHTML = "";
        getAllWarehouseAsset(assetData);
        setStatusTable(assetData);

        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-success" role="alert" id='alert-2'>
               Item Successfully Set For Sale
        </div>
        `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      }
    });
};

const setModalonEdit = () => {
  modalSignal = "EDIT";
  save.style.display = "block";

  modalBody.innerHTML = "";
  modalTitle.textContent = "Ready To Sale";
  modalBody.insertAdjacentHTML(
    "beforeend",
    `
      <div class='container'>
        <input type='number' id='asset-price' name='asset-price' class='form-control mt-2' placeholder='Enter the price' require />
      </div>
        `
  );
  assetPrice = document.getElementById("asset-price");
};

save.addEventListener("click", (e) => {
  switch (modalSignal) {
    case "EDIT":
      if (assetPrice !== null) {
        if (assetPrice.value !== "") {
          if (selectedAssets.length > 0) {
            modalBody.innerHTML = `<div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            </div>
          </div>`;

            selectedAssets.forEach((item) => {
              setChickenForSale(item, Number(assetPrice.value.trim()));
            });
          } else {
            modalBody.innerHTML = `<div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            </div>
          </div>`;
            setChickenForSaleReq(
              assetId.trim(),
              Number(assetPrice.value.trim())
            );
          }
        }
        assetPrice.value = "";
      }
      return;
  }
});

const getAllWarehouseAsset = (data = []) => {
  const statusFilter = "warehouse";
  const typeFilter = "batch";
  const itemTypeFilter = "batch";

  const batchWarehouse = "username@OrgD2";

  let filterStatus = [
    statusFilter,
    readyToSale.name.toLowerCase(),
    readyToLocalDelivery.name.toLowerCase(),
  ];

  // if is not required -> just in case of any mess
  if (data.length > 0) {
    data = data.filter(
      (item) =>
        item.status.toLowerCase() == statusFilter ||
        item.status.toLowerCase() == readyToSale.name.toLowerCase()
    );
  }
  // data = data.filter(
  //   (item) =>
  //     (item.status.toLowerCase() === statusFilter ||
  //       item.status.toLowerCase() === readyToSale.name.toLowerCase()) &&
  //     item.type.toLowerCase() === typeFilter
  // );

  // cleare the table then replace it
  warehouseTableList.innerHTML = "";
  warehouseTableList.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
        <tr>
            <th scope="col">
            <input
                type="checkbox"
                value=""
                id="warehouse-check-box"
            />
            <label for="check1"></label>
            </th>
            <th scope="col">ID</th>
            <th scope="col">Count</th>
            <th scope="col">Price</th>
            <th scope="col">status</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody id="warehouse-list"></tbody>
    `
  );

  let warehouseList = document.getElementById("warehouse-list");

  data.forEach((asset, index) => {
    warehouseList.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
        <th scope="row">
              <input type="checkbox" value="${index}" id="asset-checkbox" onClick="addAssetToList('${
        asset.id
      }')">
              <label for="check1"></label>
        </th>
          <td>${asset.SerialNumber}</td>
          
          <td id='asset-price-${index}'>${asset.childesCount}</td>
          <td id='asset-price-${index}'>${asset.price}</td>
          <td>
          <span class="badge ${asset.statusColor}">${
        asset.status ? asset.status : "Produced"
      }</span>
          </td>
          <td>
          <a class="btn btn-default btn-sm" id="history-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        asset.id
      }'); setModalOnView();" href="#">
          <i class="fa fa-history">
          </i>
      </a>
      <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        asset.id
      }'); setModalOnMetadataView();" href="#">
          <i class="fas fa-eye">
          </i>
      </a>
      <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        asset.id
      }'); setModalonEdit()" href="#">
        <i class="fas fa-pencil-alt">
        </i>
    </a>
      </td>
        </tr>
         `
    );
    // usernameSidebar.textContent = carveOutUsername(chicken.owner);
  });
};

const setStatusTable = (data = []) => {
  const statusFilter = "warehouse";
  if (data.length > 0) {
    data = data.filter(
      (item) =>
        item.status.toLowerCase() !== statusFilter &&
        item.status.toLowerCase() !== readyToSale.name.toLowerCase()
    );
  }
  warehouseTableStatusList.innerHTML = "";
  warehouseTableStatusList.insertAdjacentHTML(
    "beforeend",
    `
  <thead>
  <tr>
  <th scope="col">Serial No.</th>
  <th scope="col">Owner</th>
  <th scope="col">Buyer</th>
  <th scope="col">status</th>
  </tr>
</thead>
<tbody id="warehouse-list-status"></tbody>
  `
  );

  const warehouseListStatus = document.getElementById("warehouse-list-status");

  data.forEach((asset, index) =>
    warehouseListStatus.insertAdjacentHTML(
      "beforeend",
      `
  <tr>
      <td>${asset.SerialNumber}</td>
      <td>${asset.owner} </td>
      <td>${asset.buyer}</td>
      <td>
        <span class="badge ${asset.statusColor}">${asset.status}</span>
      </td>
  </tr>

  `
    )
  );
};

function openEditModal(assId) {
  assetId = assId;
}

const carveOutUsername = (username) => {
  return username.split("@")[1];
};

const carveOutPrice = (data = [], key) => {
  let filteredData = data.filter((obj) => obj._id === key);
  if (filteredData.length === 0) return 0;
  return filteredData[0].price;
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
        username = currUser;
        switch (userRole.role) {
          case "Factory":
            listSection.style.display = "block";
            productionSection.style.display = "block";
            historySection.style.display = "block";
            return;

          case "Warehouse":
            shopSection.style.display = "block";
            warehouseSection.style.display = "block";
            requestSection.style.display = "block";
            metaMaskDropdownSection.style.display = "flex";
            // window.location.replace("./Warehouse.html");
            return;

          case "Wholesaler":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            return;

          case "Retailer":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            productionSection.style.display = "block";
            historySection.style.display = "block";
            return;
        }
      }
    });
};

const getToken = () => {
  fetch(getTokenURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error !== "null") {
        // for all page
        inventorySidebar.textContent = data.result?.amount;
        blockedInvenory.textContent = data.result?.blockAmount;
        // usernameSidebar.textContent = carveOutUsername(data.result?.user);
        setRoleAccess(data.result.user);
        //
      }
    });
};

let account;
metaMaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
    account = accounts[0];
    walletAddr.textContent =
      account.substring(0, 10) +
      "..." +
      account.substring(account.length - 10, account.length - 1);
    // console.log(account);

    ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((result) => {
        let wei = parseInt(result, 16);
        let balance = wei / 10 ** 18;
        walletBalance.textContent = String(balance).substring(0, 5) + " ETH";
        // console.log(balance + "ETH");
      });
  });
  metaMaskBtn.setAttribute("disabled", true);
  metaMaskBtn.textContent = "connected";
});

window.addEventListener("load", async () => {
  getToken();
  const info = await getAllAssets();
  assetData = info;
  getAllWarehouseAsset(info);
  setStatusTable(info);
});
