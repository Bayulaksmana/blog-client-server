import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Modul tambahan
import Sankey from 'highcharts/modules/sankey';
import * as Organization from 'highcharts/modules/organization';
import * as Exporting from 'highcharts/modules/exporting';
// Aktivasi modul
if (typeof Highcharts === 'object') {
    if (!Highcharts.Series.types.sankey) {
        Sankey(Highcharts);
    }
    if (!Highcharts.Series.types.organization) {
        Organization(Highcharts);
    }
}
if (typeof Exporting === 'function') {
    Exporting(Highcharts);
}
const options = {
    chart: {
        type: 'organization',
        inverted: true,
        Width: "w-full",
        height: "h-screen",
        fontSize: "20px",
        className: 'chart-org',
    },
    title: {
        text: 'Struktur Organisasi',
    },
    series: [{
        name: 'Struktur Organisasi',
        keys: ['from', 'to'],
        data: [
            ['CEO', 'CTO'],
            ['CEO', 'CFO'],
            ['CTO', 'Engineer'],
            ['CFO', 'Finance'],
        ],
        nodes: [
            { id: 'CEO', title: 'Chief Executive Officer', name: 'Agus', color: '#007ad0' },
            { id: 'CTO', title: 'Chief Technology Officer', name: 'Budi', color: '#00a86b', collapsed: true },
            { id: 'CFO', title: 'Chief Financial Officer', name: 'Citra', color: '#e67e22' },
            { id: 'Engineer', title: 'Engineer', name: 'Dewi', color: '#8e44ad' },
            { id: 'Finance', title: 'Finance Staff', name: 'Eka', color: '#c0392b' }
        ],
        colorByPoint: false,
        color: '#007ad0',
        dataLabels: {
            color: 'white',
            style: {
                textOutline: 'none',
                fontWeight: 'bold',
            },
        },
        borderColor: 'black',
        borderRadius: 'rounded-2xl',
        nodeWidth: 60,
    }],
};

const OrganizationChart = () => (
    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{
        className: 'rounded-2xl p-4 bg-white shadow-md',
    }} />
);

export default OrganizationChart;
