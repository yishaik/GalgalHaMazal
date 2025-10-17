# Wheel of Fortune – Full Project File

## Introduction

The **Wheel of Fortune** system is a techno-artistic installation that includes a 10-meter diameter LED ring, a central matrix, and a sensor mechanism that detects the direction and speed of rotation. This file centralizes all the necessary files for building the system, as well as a detailed technical specification of every connector, wire, resistor, capacitor, and recommended screws.

This file is intended to serve as a basis for work and maintenance, and allows quick access to wiring diagrams, the Bill of Materials, and assembly instructions.

## File Structure

| File/Folder | Description |
|---|---|
| **diagram_mermaid.html** | General wiring diagram in HTML-Mermaid format. It shows the control box, distribution box, control panel, and wheel components. |
| **Diagram.jsx** | A React component that displays a detailed SVG wiring map, color legend, and specification "cards". It can be imported into existing React code or opened in a browser using a Bundler. |
| **technical_spec_updated.pdf** | The original specification document as provided by the designer. It contains a system description, logic, algorithms, and additional requirements. |
| **BOM.csv** | A complete Bill of Materials in CSV format: category, part type, value/specification, recommended quantity, and a short description. |
| **README.md** | This documentation file. |

## System Overview

The system is divided into four main sub-systems:

1.  **Control Box - Power and Safety:** Located at a mounting point and contains an IEC C14 inlet, main fuses, an emergency switch, and two power supplies (24V and 5V). The power circuits are protected by slow-blow fuses and connected to a common ground.
2.  **Control Box - Power Distribution:** Bus Bars for 24V, 5V, and GND. Each bus is connected through a separate fuse to the corresponding supply. Massive cables run from the bars to the ring and matrix.
3.  **Electronic Control Panel:** Includes the micro-controllers (Arduino Uno for controlling the LED ring, ESP32 Sensor for reading Hall sensors and activating the triangle, ESP32 Matrix for operating the matrix and managing a Web interface). The board includes Pull-up resistors, matching resistors, and filtering capacitors.
4.  **Wheel Components:** The 10m long LED ring (WS2814 24V) with 5 power injection points and 160 segments; a central 32×32 matrix (WS2812B 5V); Hall sensors and a "triangle" of light. All components are connected using GX16-3 connectors and IP65 circular connectors.

The attached wiring diagram color-codes the power and data cables: **Red** – V+, **Black** – GND, **Green** – DATA for WS281x, **Blue** – UART/I²C (between controllers), **Purple** – Hall sensors.

## Bill of Materials (BOM)

The components listed in the `BOM.csv` file are divided into categories: Power, Control, Connectors, Wires and Cables, Resistors and Capacitors, Lighting and Sensor Components, and Screws/Mechanical Parts. It is recommended to open the file in a spreadsheet editor for a clear view. Here is a summary:

### Power Supplies and Protections

*   **IEC C14 with switch** – 230V AC power inlet; includes a main switch to break the circuit.
*   **5×20 mm slow-blow fuses** – T-10A for the 24V line; T-15A for the 5V line; recommended to install close to the supplies.
*   **24V/15A PSU (~300W)** – Supplies power to the WS2814 and accessories requiring 24V.
*   **5V/60A PSU** – Supplies power to the matrix, controllers, and sensors.
*   **TVS diodes** – For protection against lightning and voltage surges; to be placed on the DATA and V+ lines.

### Connectors and Cables

*   **Bus Bars** – For 24V, 5V, and GND rails. Arms are connected to them using thick cables (1.5–2.5 mm²). It is advisable to choose a bar with M4 screws.
*   **IP65 circular connectors** – Four three-pin connectors for outdoor infrastructure:
    *   24V connector – Transmits V+ (12 AWG cable) and GND to the ring;
    *   5V connector – Transmits V+ (12 AWG) and GND to the matrix;
    *   DATA connector – Transmits the data line (shielded CAT6/22 AWG cable) to the ring;
    *   **SENSOR** connector – Transmits 5V, GND, and sensor signal to Hall sensors.
*   **GX16-3 connectors** – Combined circular connectors (3 pins) for integrating power+data:
    *   GX16-3 for 24V ring: Pin 1=+24V, Pin 2=GND, Pin 3=DATA;
    *   GX16-3 for 5V matrix: Pin 1=+5V, Pin 2=GND, Pin 3=DATA.
*   **JST-SM 3-Pin** – For connecting WS281x LED strips. Maintain consistency: 1=V+, 2=DATA, 3=GND (according to the arrow/IN marking).
*   **JST-XH 3-Pin** – For connecting Hall sensors: VCC (5V or 3.3V), GND, and SIG.
*   **Cables** –
    *   **Power**: Red/black two-core cables of 1.5–2.5 mm² (AWG16–14) for 24V and 5V connections;
    *   **Main GND**: 2.5 mm² cable to connect all grounds together;
    *   **DATA WS281x**: Shielded 22 AWG cable + 330 Ω resistor in series + 1000 µF capacitor at the end of the matrix;
    *   **Hall sensors**: Shielded 3-core 22–24 AWG cable up to 2m;
    *   **UART/I²C**: Twisted pair 24–26 AWG for connection between Arduino and ESP32 Sensor.

### Controllers and Sensors

*   **Arduino Uno** – Controls the WS2814 ring and receives commands from the ESP32 Sensor via UART. Use dedicated FastLED/NeoPixel libraries for 24V.
*   **ESP32 Sensor** – Reads the A3144 sensors, activates the triangle, and communicates with the ESP32 Matrix using ESP-NOW.
*   **ESP32 Matrix** – Operates the 32×32 WS2812B matrix and hosts a Web interface for management and animations.
*   **A3144 Hall sensors** – Two sensors to detect direction and speed; connected using 4.7 kΩ Pull-up resistors.
*   **Magnets** – 32 magnets distributed around the circumference and a Doublet triangle to indicate the zero point.

### Resistors and Capacitors

| Component | Value | Usage |
|---|---|---|
| **Series resistor for DATA** | 330 Ω | Improves the reliability of the DATA line for WS281x and prevents LED burnout. Located close to the source end (Arduino/ESP32). |
| **Pull-up resistor** | 4.7 kΩ | Used to pull the Hall sensor signals to 5V/3.3V. |
| **Matching resistor** | 1 kΩ | Reduces the output current from the DATA controller when multiple LED strips are activated in parallel. |
| **Electrolytic capacitor** | 1000 µF/25V | Connected in parallel to the 24V or 5V supply near the beginning of the LED strips for protection against current surges. |
| **Ceramic capacitor** | 100 nF | Connected close to the Hall sensors for noise filtering. |

### Screws and Mechanical Parts

The mechanical structure requires a strong but detachable mount. It is recommended to use the following screws and anchor points:

*   **Screws for micro-controllers** – M3×10 mm screws (with M3 nut and Phillips head) for anchoring the Arduino and ESP32 to the installation board. It is recommended to add plastic spacers.
*   **Screws for bus bars and connectors** – M4×12 mm screws with M4 nuts for securing bus bars, power supplies, and GX16 connectors to the board.
*   **Frame screws** – When installing the ring on a 6061-T6 aluminum frame, use M6 or M8 screws depending on the profile; the threads should be at least 8.8 grade.
*   **Washers and locknuts** – Use of spring washers or locknuts will prevent loosening due to vibration. Assemble uniformly around the ring.

## Assembly and System Activation Instructions

1.  **Assembly of the electrical box:** Install the IEC C14 socket with the switch. Connect the L and N lines through the appropriate fuses to the power supplies, and ensure a common ground (PE) for the metal parts. Install the emergency switch in an accessible location.
2.  **Power wiring:** The 24V connector is connected from the supply through a T-10A fuse to the distribution bar. The 5V connector comes from the supply through a T-15A fuse. Use cables with a minimum diameter of 1.5 mm². Connect the GND of both supplies together.
3.  **Controller wiring:** Connect the Arduino and ESP32 to the 5V bus bar using AWG22–24 wires. Connect the UART lines using a twisted pair. Connect the 1 kΩ and 4.7 kΩ resistors according to the wiring diagram.
4.  **Connecting the ring and matrix:** Use GX16-3 connectors to connect the power and data to the ring and matrix. Keep the DATA cable short (≤1m) from the control source to the IN point of the LED. Perform power injections every ~2m for the ring to prevent voltage drops.
5.  **Connecting Hall sensors:** Install the A3144 sensors at a distance of 2–4 mm from the magnets; use a shielded cable. Connect the VCC, GND, and SIG to the SENSOR connector. Do not forget to install the 100 nF capacitor close to the sensor.
6.  **Tests and safety:** Before activation, check for continuity and lack of short circuits. Ensure all connections are tight and screws are locked. Activate the system without an audience for testing purposes, and calibrate the sensors using the dedicated interface.

## Notes and Conclusion

This project file was built based on the attached diagrams and technical document. The actual values should be adjusted according to component availability and field requirements. When making changes, it is important to update the bill of materials and the diagrams accordingly.

For questions and clarifications, you can refer to the "technical_spec_updated.pdf" which includes further details on the logic, algorithms, and control interface.