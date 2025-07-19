import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Modul tambahan
import Sankey from 'highcharts/modules/sankey';
import * as Organization from 'highcharts/modules/organization';
import * as Exporting from 'highcharts/modules/exporting';
import { useState } from 'react';
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
// const options = {
//     chart: {
//         type: 'organization',
//         inverted: true,
//         Width: "w-full",
//         height: "h-screen",
//         fontSize: "20px",
//         className: 'chart-org',
//     },
//     title: {
//         text: 'Struktur Organisasi',
//     },
//     series: [{
//         name: 'Struktur Organisasi',
//         keys: ['from', 'to'],
//         data: [


//             ['CEO', 'CTO'],
//             ['CEO', 'CFO'],
//             ['CTO', 'Engineer'],
//             ['CFO', 'Finance'],
//         ],
//         nodes: [
//             { id: 'CTO', title: 'Chief Technology Officer', name: 'Budi', color: '#00a86b', collapsed: true },
//             { id: 'CFO', title: 'Chief Financial Officer', name: 'Citra', color: '#e67e22' },
//             { id: 'Engineer', title: 'Engineer', name: 'Dewi', color: '#8e44ad' },
//             { id: 'Finance', title: 'Finance Staff', name: 'Eka', color: '#c0392b' }
//         ],
//         colorByPoint: false,
//         color: '#007ad0',
//         dataLabels: {
//             color: 'white',
//             style: {
//                 textOutline: 'none',
//                 fontWeight: 'bold',
//             },
//         },
//         borderColor: 'black',
//         borderRadius: 'rounded-2xl',
//         nodeWidth: 60,
//     }],
// };


// const OrganizationChart = () => (
//     <HighchartsReact highcharts={Highcharts} options={options} containerProps={{
//         className: 'rounded-2xl p-4 bg-white shadow-md',
//     }} />
// );
const OrganizationChart = () => {
    const [nodes, setNodes] = useState([
        { id: 'CEO', title: 'Chief Executive Officer', name: 'Andi', color: '#2980b9' },
        { id: 'CTO', title: 'Chief Technology Officer', name: 'Budi', color: '#00a86b' },
        { id: 'CFO', title: 'Chief Financial Officer', name: 'Citra', color: '#e67e22' },
        { id: 'Engineer', title: 'Engineer', name: 'Dewi', color: '#8e44ad' },
        { id: 'Finance', title: 'Finance Staff', name: 'Eka', color: '#c0392b' },
    ]);

    const [links, setLinks] = useState([
        ['CEO', 'CTO'],
        ['CEO', 'CFO'],
        ['CTO', 'Engineer'],
        ['CFO', 'Finance'],
    ]);

    const [form, setForm] = useState({
        from: '',
        to: '',
        title: '',
        name: '',
        color: '#555'
    });

    const addNodeAndLink = (e) => {
        e.preventDefault();

        const linkExist = links.some((l) => l[0] === form.from && l[1] === form.to);
        if (linkExist) {
            alert("Link ini sudah ada!");
            return;
        }
        // Hindari duplikat node
        const nodeExist = nodes.some((n) => n.id === form.to);
        if (!nodeExist) {
            setNodes([...nodes, {
                id: form.to,
                title: form.title,
                name: form.name,
                color: form.color
            }]);
        }

        setLinks([...links, [form.from, form.to]]);

        setForm({ from: '', to: '', title: '', name: '', color: '#555' });
    };

    const options = {
        chart: {
            type: 'organization',
            inverted: true,
            height: 600,
        },
        title: {
            text: 'Struktur Organisasi Dinamis',
        },
        series: [
            {
                name: 'Organisasi',
                keys: ['from', 'to'],
                data: links,
                nodes,
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
                nodeWidth: 60,
            }
        ],
    };

    const deleteLink = (from, to) => {
        setLinks(links.filter((l) => !(l[0] === from && l[1] === to)));
    };

    return (
        <div className="p-4 space-y-6">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ className: "rounded-xl bg-white shadow p-4" }}
            />

            <form onSubmit={addNodeAndLink} className="grid gap-4 bg-white shadow rounded-xl p-4 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-700">Tambah Struktur Baru</h2>
                <div className="grid md:grid-cols-2 gap-3">
                    <input
                        required
                        type="text"
                        placeholder="Dari (id atasan)"
                        value={form.from}
                        onChange={(e) => setForm({ ...form, from: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        required
                        type="text"
                        placeholder="Ke (id bawahan)"
                        value={form.to}
                        onChange={(e) => setForm({ ...form, to: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Jabatan (title)"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Nama"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="color"
                        value={form.color}
                        onChange={(e) => setForm({ ...form, color: e.target.value })}
                        className="border p-2 rounded col-span-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition"
                >
                    Tambah ke Struktur
                </button>
            </form>
            <div className="max-w-3xl mx-auto mt-6">
                <h2 className="text-lg font-semibold mb-2">Daftar Struktur</h2>
                <table className="w-full table-auto border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1">Dari</th>
                            <th className="border px-2 py-1">Ke</th>
                            <th className="border px-2 py-1">Jabatan</th>
                            <th className="border px-2 py-1">Nama</th>
                            <th className="border px-2 py-1">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map(([from, to], i) => {
                            const target = nodes.find(n => n.id === to);
                            return (
                                <tr key={i}>
                                    <td className="border px-2 py-1">{from}</td>
                                    <td className="border px-2 py-1">{to}</td>
                                    <td className="border px-2 py-1">{target?.title || '-'}</td>
                                    <td className="border px-2 py-1">{target?.name || '-'}</td>
                                    <td className="border px-2 py-1">
                                        <button
                                            onClick={() => deleteLink(from, to)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrganizationChart;
