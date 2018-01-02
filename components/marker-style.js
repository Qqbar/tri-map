export default `
.station:before {
  content: ' ';
  display: inline-block;
  width: 10px;
  height: 10px;
  background: black;
  border-radius: 8px;
  margin: 0 8px;
}
.station {
  border-radius: 20px;
  padding-right: 12px;
  margin: -12px;
  color: transparent;
  line-height: 24px;
  font-size: 20px;
  white-space: nowrap;
}
.station span {
  display: none;
}
.station:hover {
  background: rgba(0,0,0,0.8);
  color: #fff;
}
.station:hover span {
  display: inline-block;
}

.vehicle:before {
  content: ' ';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 8px;
  margin: 0 8px;
}
.vehicle {
  border-radius: 20px;
  padding-right: 12px;
  margin: -12px;
  line-height: 24px;
  font-size: 18px;
  white-space: nowrap;
  background: rgba(0,0,0,0.3);
  color: #fff;
}
.vehicle span {
  display: inline-block;
}
.vehicle:hover {
  background: rgba(0,0,0,0.5);
}
.vehicle:hover span {
  display: inline-block;
}

.current {
  display: inline-block;
  color: #428bca;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  opacity: 1;
  animation: pulse 1.5s ease-out infinite;
}

@-webkit-keyframes pulse {
  50% { opacity: .2 }
}
`;
